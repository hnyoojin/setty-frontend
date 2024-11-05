import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput,Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const CalendarScreen = ({ navigation, route }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [todoText, setTodoText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // 현재 날짜 불러오기
      setCurrentDate(new Date());

      // ScheduleInput에서 전달받은 일정 params
      const receivedSchedule = route.params?.scheduleData;
      if (receivedSchedule) {
        setSchedules([...schedules, receivedSchedule]); // schedules 배열에 새로 추가
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

    for (let row = 0; row < 5; row++) {
      const weekCells = [];
      for (let col = 0; col < 7; col++) {
        const daySchedules = schedules.filter(schedule => new Date(schedule.date).getDate() === dayCounter);
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

  const renderCalendar = () => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <>
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

  const addTodoItem = () => {
    if (todoText.trim() === '') {
      Alert.alert('항목을 입력해 주세요.');
      return;
    }

    setTodoItems([...todoItems, { id: new Date().getTime(), text: todoText }]);
    setTodoText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarBox}>
        <ScrollView style={styles.calendar}>
          {renderCalendar()}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScheduleInput')}>
          <Text style={styles.buttonText}>일정 추가</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todoBox}>
        <Text style={styles.header}>투두리스트</Text>
        {todoItems.map(item => (
          <Text key={item.id}>{item.text}</Text>
        ))}
        <View style={styles.addTodoContainer}>
          <TextInput
            style={styles.input}
            value={todoText}
            onChangeText={setTodoText}
            placeholder="항목을 입력해 주세요"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodoItem}>
            <Text style={styles.buttonText}>투두리스트 추가</Text>
          </TouchableOpacity>
        </View>
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
    flex: 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  todoBox: {
    flex: 0.4,
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
    color: 'white',
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
