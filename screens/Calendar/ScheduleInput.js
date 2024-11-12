import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform,Text,Alert } from 'react-native';

const ScheduleInput=({ navigation })=> {
  //const schedules = route.params;
  const [eventName, setEventName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');

  //스케줄 저장
  const saveSchedule = () => {
    const scheduleStartDate = `${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}T${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')}:00`;
    const scheduleEndDate = `${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}T${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')}:00`;
    if(eventName && startYear && startMonth && startDay && startHour&&startMinute&& endYear && endMonth && endDay && endHour && endMinute){
    const schedule = {
      sid: new Date().getTime(),
      event: eventName,
      startDate: scheduleStartDate,
      endDate: scheduleEndDate,
    };

    //addSchedule(schedule);
    navigation.navigate('CalendarScreen',{schedule:schedule});

    //확인용
    console.log('Saved Date:',schedule);
    //저장 후 화면 초기화
    setEventName('');
    setStartYear('');
    setStartMonth('');
    setStartDay('');
    setStartHour('');
    setStartMinute('');
    setEndYear('');
    setEndMonth('');
    setEndDay('');
    setEndHour('');
    setEndMinute('');
    }
    else{
      Alert.alert('모든 영역을 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="일정의 이름"
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
      />
      <Text>일정 시작일시</Text>
      <View style={styles.dateRow}>
      <TextInput
        placeholder="년(YYYY)"
        style={styles.dateInput}
        value={startYear}
        keyboardType="numeric"
        onChangeText={setStartYear}
      />
      <TextInput
        placeholder="월(MM)"
        style={styles.dateInput}
        value={startMonth}
        keyboardType="numeric"
        onChangeText={setStartMonth}
      />
      <TextInput
        placeholder="일(DD)"
        style={styles.dateInput}
        value={startDay}
        keyboardType="numeric"
        onChangeText={setStartDay}
      />
      </View>
      <View style={styles.timeRow}>
      <TextInput
        placeholder="시"
        style={styles.timeInput}
        value={startHour}
        keyboardType="numeric"
        onChangeText={setStartHour}
      />
      <TextInput
        placeholder="분"
        style={styles.timeInput}
        value={startMinute}
        keyboardType="numeric"
        onChangeText={setStartMinute}
      />
      </View>
      <Text>일정 종료일시</Text>
      <View style={styles.dateRow}>
      <TextInput
        placeholder="년(YYYY)"
        style={styles.dateInput}
        value={endYear}
        keyboardType="numeric"
        onChangeText={setEndYear}
      />
      <TextInput
        placeholder="월(MM)"
        style={styles.dateInput}
        value={endMonth}
        keyboardType="numeric"
        onChangeText={setEndMonth}
      />
      <TextInput
        placeholder="일(DD)"
        style={styles.dateInput}
        value={endDay}
        keyboardType="numeric"
        onChangeText={setEndDay}
      />
      </View>
      <View style={styles.timeRow}>
      <TextInput
        placeholder="시"
        style={styles.timeInput}
        value={endHour}
        keyboardType="numeric"
        onChangeText={setEndHour}
      />
      <TextInput
        placeholder="분"
        style={styles.timeInput}
        value={endMinute}
        keyboardType="numeric"
        onChangeText={setEndMinute}
      />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="취소" onPress={() => navigation.goBack()} />
        <Button title="저장" onPress={saveSchedule} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateRow: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:10,
  },
  dateInput:{
    borderWidth:1,
    borderColor:'#000000',
    padding:10,
    width: Platform.OS==='ios'?'20%':90,
    borderRadius:3,
    textAlign:'left',
  },
  timeRow:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:10,
  },
  timeInput:{
    borderWidth:1,
    borderColor:'#000000',
    padding:10,
    width: Platform.OS==='ios'? '33%':150,
    borderRadius:3,
    textAlign:'left',
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
});

export default ScheduleInput;
