import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform } from 'react-native';

const ScheduleInput = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth]=useState('');
  const [day, setDay]=useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute]=useState('');

  //스케줄 저장
  const saveSchedule = () => {
    const scheduleDate='${year}-${month+1}-${day}';
    const schedule={
      sid: new Date().getTime(),
      event: eventName,
      date:scheduleDate,
    }
    console.log('Saved Date:',schedule);
    navigation.navigate('CalendarScreen', {ScheduleData: schedule});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="일정의 이름"
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
      />
      <View style={styles.dateRow}>
      <TextInput
        placeholder="년(YYYY)"
        style={styles.dateInput}
        value={year}
        keyboardType="numeric"
        onChangeText={setYear}
      />
      <TextInput
        placeholder="월(MM)"
        style={styles.dateInput}
        value={month}
        keyboardType="numeric"
        onChangeText={setMonth}
      />
      <TextInput
        placeholder="일(DD)"
        style={styles.dateInput}
        value={day}
        keyboardType="numeric"
        onChangeText={setDay}
      />
      </View>
      <View style={styles.timeRow}>
      <TextInput
        placeholder="시"
        style={styles.timeInput}
        value={hour}
        keyboardType="numeric"
        onChangeText={setHour}
      />
      <TextInput
        placeholder="분"
        style={styles.timeInput}
        value={minute}
        keyboardType="numeric"
        onChangeText={setMinute}
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
    width: Platform.OS==='ios'?'33%':120,
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
    width: Platform.OS==='ios'? '50%':200,
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
