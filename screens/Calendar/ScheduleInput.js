import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import GetScheduleDate from './components/getScheduleDate';
import GetScheduleTime from './components/getScheduleTime';
import { useSchedule } from '../components/scheduleContext';

const ScheduleInput = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentType, setCurrentType] = useState('');  // 'start' or 'end' type
  const { addSchedule,schedules }=useSchedule();

  // 시간을 맞추는 함수
  const adjustTimeByHours = (date, hours) => {
    const adjustedDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
    return adjustedDate;
  };

  const [selectedStartDate, setSelectedStartDate] = useState(adjustTimeByHours(new Date(),9));
  const [selectedStartTime, setSelectedStartTime] = useState(adjustTimeByHours(new Date(), 9));
  const [selectedEndDate, setSelectedEndDate] = useState(adjustTimeByHours(new Date(),9));
  const [selectedEndTime, setSelectedEndTime] = useState(adjustTimeByHours(new Date(), 9)); 

  // 날짜 모달 열기
  const openDateModal = (type) => {
    setCurrentType(type);
    setModalVisible('date');  // 날짜 모달 열기
  };

  // 시간 모달 열기
  const openTimeModal = (type) => {
    setCurrentType(type);
    setModalVisible('time');  // 시간 모달 열기
  };

  // 날짜 선택 처리
  const handleDateSelect = (date) => {
    if (currentType === 'start') {
      setSelectedStartDate(date);
    } else if (currentType === 'end') {
      setSelectedEndDate(date);
    }
    setModalVisible(false);  // 모달 닫기
  };

  // 시간 선택 처리
  const handleTimeSelect = (time) => {
    if (currentType === 'start') {
      setSelectedStartTime(time);
    } else if (currentType === 'end') {
      setSelectedEndTime(time);
    }
    setModalVisible(false);  // 모달 닫기
  };

  // 일정 저장
  const saveSchedule = () => {
    const newSchedule = {
      sid: new Date().getTime().toString(),
      event: eventName,
      startDate: selectedStartDate,
      startTime: selectedStartTime,
      endDate: selectedEndDate,
      endTime: selectedEndTime,
    };

    addSchedule(newSchedule);
    console.log('보낸 스케줄 from ScheduleInput\n', JSON.stringify(newSchedule,null,2));
    setEventName('');
    navigation.goBack();
  };

  useEffect(() => {
    console.log('스케줄 상태 업데이트됨 from ScheduleInput\n', JSON.stringify(schedules, null, 2));
  }, [schedules]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="일정의 이름"
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
      />

      <Text>일정 시작일시</Text>
      {/* 날짜 선택 */}
      <TouchableOpacity style={styles.setButton} onPress={() => openDateModal('start')}>
        <Text>{selectedStartDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {/* 시간 선택 */}
      <TouchableOpacity style={styles.setButton} onPress={() => openTimeModal('start')}>
        <Text>{selectedStartTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      <Text>일정 종료일시</Text>
      {/* 날짜 선택 */}
      <TouchableOpacity style={styles.setButton} onPress={() => openDateModal('end')}>
        <Text>{selectedEndDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {/* 시간 선택 */}
      <TouchableOpacity style={styles.setButton} onPress={() => openTimeModal('end')}>
        <Text>{selectedEndTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {/* 모달을 닫는 부분 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      </View>

      {/* 날짜 모달 컴포넌트 */}
      {modalVisible === 'date' && (
        <GetScheduleDate
          visible={modalVisible === 'date'}
          onClose={() => setModalVisible(false)}
          onConfirm={handleDateSelect}
          currentType={currentType}
          initialDate={currentType === 'start' ? selectedStartDate : selectedEndDate}
        />
      )}

      {/* 시간 모달 컴포넌트 */}
      {modalVisible === 'time' && (
        <GetScheduleTime
          visible={modalVisible === 'time'}
          onClose={() => setModalVisible(false)}
          onConfirm={handleTimeSelect}
          currentType={currentType}
          initialTime={currentType === 'start' ? selectedStartTime : selectedEndTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setButton: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#512DA8',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#7030B8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#7030B8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default ScheduleInput;
