import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler,State } from 'react-native-gesture-handler';

  const CalendarScreen = ({ route,navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateSchedules, setSelectedDateSchedules] = useState([]);
  const translateX = useState(new Animated.Value(0))[0];

  useFocusEffect(
    React.useCallback(() => {
      setCurrentDate(new Date());
      const receivedSchedule = route.params?.schedule;
      if (receivedSchedule) {
        setSchedules(prevSchedules => [...prevSchedules, receivedSchedule]);
        //확인용
        console.log(receivedSchedule);
      }
    }, [route.params?.schedule])
  );
    
  //선택한 날짜의 일정을 가져오는 함수
  const getSchedulesForDate = (date) => {
    return schedules.filter(schedule => {
      const scheduleStartDate = new Date(schedule.startDate);
      const scheduleEndDate = new Date(schedule.endDate);

    // 날짜를 UTC 기준으로 변환
    const utcDate = new Date(date);
    utcDate.setUTCHours(0, 0, 0, 0); // UTC 기준으로 00:00:00으로 설정

    // startDate와 endDate를 UTC 기준으로 변환하여 비교
    const utcStartDate = new Date(scheduleStartDate);
    const utcEndDate = new Date(scheduleEndDate);

    utcStartDate.setUTCHours(0, 0, 0, 0);
    utcEndDate.setUTCHours(23, 59, 59, 999);

    console.log("Checking Date:", utcDate);
    console.log("Start Date:", utcStartDate);
    console.log("End Date:", utcEndDate);

    // 날짜 비교 (UTC 기준으로 비교)
    return utcDate >= utcStartDate && utcDate <= utcEndDate;
  });
  };

  //해당 날짜를 눌렀을 때 일정을 가져오는 함수
  const onDatePress = (selectedDate) => {
    const schedulesForDate = getSchedulesForDate(selectedDate);
    setSelectedDateSchedules(schedulesForDate);
    setSelectedDate(selectedDate);
  };

  //스와이프할 때마다 달력을 새롭게 생성하는 함수 -> 문제가 있음 파일 저장할 때마다 같은 일정이 반복해서 추가돼요
  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate,schedules]); //현재 날짜에 의존

  //스와이프 애니메이션
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

  const generateCalendar = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const calendarRows = [];
    let dayCounter = 1 - startDay;

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
          <TouchableOpacity key={`${row}-${col}`} style={styles.weekCells} onPress={() => onDatePress(currentDate)}>
            <Text>{dayCounter > 0 && dayCounter <= daysInMonth ? dayCounter : ''}</Text>

            {/* 일정 렌더링 */}
            {daySchedules.slice(0, 3).map((schedule, index) => {
              let scheduleStartDate = new Date(schedule.startDate);
              let scheduleEndDate = new Date(schedule.endDate);
              const scheduleColor = getScheduleColor(index);

              // 시작일과 종료일에 걸쳐 있는 일정을 직선으로 렌더링
              for (let i = scheduleStartDate.getDate(); i <= scheduleEndDate.getDate(); i++) {
                const scheduleKey = `${schedule.sid}-${i}`;
                return (
                  <View key={scheduleKey} style={[styles.scheduleBar, { backgroundColor: scheduleColor }]}>
                    <Text style={styles.scheduleText}>{schedule.event}</Text>
                  </View>
                );
              }
            }
          )}
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

        {/* 선택된 날짜의 일정 표시 */}
        {selectedDateSchedules.length > 0 && (
          <View style={styles.selectedDateBox}>
            <Text style={styles.selectedDateText}>{selectedDate?.toDateString()}</Text>
            {selectedDateSchedules.map((schedule, index) => (
              <Text key={index}>{schedule.event}</Text>
            ))}
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <PanGestureHandler onHandlerStateChange={handleSwipe}>
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
  header:{
    fontSize:25,
    marginBottom:20,
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
    borderWidth: 1,
    borderColor: '#000',
    width: '13%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleBar: {
    height: 12,
    marginTop: 2,
    borderRadius: 2,
    width:'100%',
  },
  scheduleText: {
    fontSize: 8,
    color: 'black',
  },
  selectedDateBox: {
    position: 'absolute',
    top: '10%',
    left: '80%',
    transform: [{ translateX: -150 }, { translateY: -50 }],
    backgroundColor: 'white',
    width:'50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    zIndex: 999, //overlap
  },
  selectedDateText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#7030B8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
  },
});

export default CalendarScreen;
