import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSchedule } from '../components/scheduleContext';

const CalendarScreen = ({ navigation }) => {
  const { schedules,currentDate, setCurrentDate, filteredSchedules, deleteSchedule } = useSchedule();
  const translateX = useState(new Animated.Value(0))[0];
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateSchedules, setSelectedDateSchedules] = useState([]);

  const generateCalendar = useCallback(() => {
    console.log('현재 저장된 스케줄\n', JSON.stringify(schedules,null,2));
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();
    const calendarRows = [];

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    calendarRows.push(
      <View key="weekDays" style={styles.row}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>
    );

    let dayCounter = 1 - startDay;

    for (let row = 0; row < 6; row++) {
      const weekCells = [];
      for (let col = 0; col < 7; col++) {
        const nowDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayCounter);
        const daySchedules = filteredSchedules.filter((schedule) => {
          const scheduleStartDate = new Date(schedule.startDate);
          const scheduleEndDate = new Date(schedule.endDate);
          return (
            nowDate.toDateString() === scheduleStartDate.toDateString() || // 시작일이 현재 날짜와 동일
            (nowDate >= scheduleStartDate && nowDate <= scheduleEndDate)   // 현재 날짜가 일정 기간 내에 포함
          );
        });

        weekCells.push(
          <TouchableOpacity
            key={`${row}-${col}`}
            style={styles.weekCells}
            onPress={() => {
              setSelectedDate(nowDate);
              setSelectedDateSchedules(daySchedules);
            }}
          >
            <Text>{dayCounter > 0 && dayCounter <= daysInMonth ? dayCounter : ''}</Text>
            {daySchedules.slice(0, 3).map((schedule, index) => (
              <View
                key={schedule.sid}
                style={[
                  styles.scheduleBar,
                  { backgroundColor: getScheduleColor(index) },
                ]}
              >
              <Text style={index === 2 ? styles.scheduleText2 : styles.scheduleText1}>{schedule.event}</Text>
              </View>
            ))}
          </TouchableOpacity>
        );
        dayCounter++;
      }
      calendarRows.push(
        <View key={row} style={styles.row}>
          {weekCells}
        </View>
      );
    }

    setCalendar(calendarRows);
  }, [currentDate, filteredSchedules,schedules]);

  useEffect(() => {
    generateCalendar();
  }, [generateCalendar,filteredSchedules]);

  const getScheduleColor = (index) => {
    const colors = ['#D1C4E9', '#9575CD', '#512DA8'];
    return colors[index % colors.length];
  };

  const goToNextMonth = () => {
    Animated.timing(translateX, {
      toValue: -100, // 100 픽셀 왼쪽으로 스와이프
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
      setCurrentDate(nextDate);
      resetAnimation();
    });
  };

  const goToPreviousMonth = () => {
    Animated.timing(translateX, {
      toValue: 100, // 100 픽셀 오른쪽으로 스와이프
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
      setCurrentDate(prevDate);
      resetAnimation();
    });
  };

  const resetAnimation = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX < 0) {
        // 왼쪽으로 스와이프: 다음 달
        goToNextMonth();
      } else {
        // 오른쪽으로 스와이프: 이전 달
        goToPreviousMonth();
      }
    }
  };

  const handleSchedulePress = (schedule) => {
    Alert.alert(
      '스케줄 삭제',
      '스케줄을 삭제하시겠습니까?',
      [
        {
          text: '네',
          onPress: async () => {
            await deleteSchedule(schedule.sid); // Context에서 API 호출
            console.log('삭제한 스케줄(from scheduleContext)\n', JSON.stringify(schedule));
          },
        },
        {
          text: '아니오',
        },
      ]
    );
  };

  const renderScheduleList = () => {
    if (!selectedDate || selectedDateSchedules.length === 0) return null;

    return (
      <View style={styles.selectedDateBox}>
        <Text style={styles.selectedDateText}>
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 일정
        </Text>
        <FlatList
          data={selectedDateSchedules}
          keyExtractor={(item) => item.sid}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.scheduleItem}
            onPress={() => handleSchedulePress(item.sid)}
          >
            <Text style={styles.scheduleBoxText}>일정명: {item.event}</Text>
            <Text style={styles.scheduleBoxText}>시작 날짜: {new Date(item.startDate).toLocaleDateString([],{month: '2-digit', day:'2-digit'})}</Text>
            <Text style={styles.scheduleBoxText}>시작 시각: {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <Text style={styles.scheduleBoxText}>종료 날짜: {new Date(item.endDate).toLocaleDateString([],{month: '2-digit',day:'2-digit'})}</Text>
            <Text style={styles.scheduleBoxText}>종료 시각: {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <PanGestureHandler onHandlerStateChange={handleSwipe}>
          <Animated.View style={[styles.calendar, { transform: [{ translateX }] }]}>
            <View>
              <Text style={styles.header}>
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
              </Text>
            </View>
            {calendar}
          </Animated.View>
        </PanGestureHandler>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScheduleInput')}>
          <Text style={styles.buttonText}>일정 추가</Text>
        </TouchableOpacity>
        {renderScheduleList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5D0FD',
    padding: 20,
  },
  calendarBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekCells: {
    borderWidth: 0,
    width: '13%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleBar: {
    height: 12,
    marginTop: 2,
    borderRadius: 2,
    width: '115%',
  },
  scheduleText1: {
    fontSize: 10,
    textAlign: 'center',
  },
  scheduleText2: {
    fontSize: 10,
    textAlign: 'center',
    color:'white',
  },
  scheduleBoxText: {
    fontSize: 13,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#7030B8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  selectedDateBox: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    zIndex: 999,
    padding: 10,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default CalendarScreen;
