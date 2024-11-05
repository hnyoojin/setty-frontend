import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler, State } from "react-native-gesture-handler";

const CalendarScreen = ({ navigation, route }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const translateX = useState(new Animated.Value(0))[0];
  
  useFocusEffect(
    React.useCallback(() => {
      setCurrentDate(new Date());

      // ScheduleInput.js에서 전달받은 일정 params
      const receivedSchedule = route.params?.scheduleData;
      if (receivedSchedule) {
        setSchedules(prevSchedules => [...prevSchedules, receivedSchedule]);    
      }
    }, [route.params])
  );

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate, schedules]);

  const generateCalendar = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const calendarRows = [];
    let dayCounter = 1 - startDay;

    // 달력 만들기
    for (let row = 0; row < 5; row++) {
      const weekCells = [];
      for (let col = 0; col < 7; col++) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), dayCounter);
        const daySchedules = schedules.filter(schedule => {
          const scheduleStartDate = new Date(schedule.startDate);
          const scheduleEndDate = new Date(schedule.endDate);
          return currentDate >= scheduleStartDate && currentDate <= scheduleEndDate;
        });

        weekCells.push(
          <View key={`${row}-${col}`} style={styles.weekCells}>
            <Text>{dayCounter > 0 && dayCounter <= daysInMonth ? dayCounter : ''}</Text>
            {daySchedules.slice(0, 3).map((schedule, index) => (
              <View key={schedule.sid} style={[styles.scheduleBar, { backgroundColor: getScheduleColor(index) }]}>
                <Text style={styles.scheduleText}>{schedule.event}</Text>
              </View>
            ))}
          </View>
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
  };

  const getScheduleColor = (index) => {
    const colors = ['#D1C4E9', '#9575CD', '#512DA8'];
    return colors[index % colors.length];
  };

  const renderCalendar = (currentDate) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <>
        <View>
          <Text style={styles.header}>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</Text>
        </View>
        <View style={styles.row}>
          {weekdays.map((day, index) => (
            <View key={index} style={styles.weekCells}>
              <Text>{day}</Text>
            </View>
          ))}
        </View>
        {calendar}
      </>
    );
  };

  const handleGesture = (event) => {
    if (event.nativeEvent.state === State.END) {
      const translationX = event.nativeEvent.translationX;
      if (translationX > 50) {
        goToPreviousMonth(); // 오른쪽으로 스와이프
      } else if (translationX < -50) {
        goToNextMonth(); // 왼쪽으로 스와이프
      } else {
        resetAnimation(); // 스와이프가 충분하지 않으면 초기화
      }
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <PanGestureHandler onGestureEvent={Animated.event([{ nativeEvent: { translationX: translateX } }], { useNativeDriver: true })} onHandlerStateChange={handleGesture}>
          <Animated.View style={[styles.calendar, { transform: [{ translateX }] }]}>
            {renderCalendar(currentDate)}
          </Animated.View>
        </PanGestureHandler>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScheduleInput')}>
          <Text style={styles.buttonText}>일정 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5D0FD',
    padding: 20,
  },
  calendarBox: {
    flex: 0.75,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  todoBox: {
    flex: 0.25,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekCells: {
    borderWidth: 1,
    borderColor: '#000',
    width: '13%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleBar: {
    height: 5,
    marginTop: 2,
    borderRadius: 2,
  },
  scheduleText: {
    fontSize: 8,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#7030B8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  addTodoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7030B8',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default CalendarScreen;
