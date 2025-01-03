import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

// 회원 가입 정보 창으로 이동
const UserTypeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>당신은{'\n'}한국 생활에{'\n'}대하여...</Text>

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserInfo')}>
          <Text style={styles.text}>도움을 받고 싶어요</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserInfo')}>
          <Text style={styles.text}>도움을 주고 싶어요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#E5D0FD',
  },
  headerText: {
    color: '#000069',
    fontSize: Platform.OS === 'ios' ? '25%' : 25,
    textAlign: 'center',
    marginBottom: '8%',
    fontWeight: '600',
  },
  divider: {
    height: '0.3%',
    backgroundColor: '#7030B8',
    width: '80%',
    marginVertical: '8%',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#7030B8',
    marginTop: '2%',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
  },
  text: {
    color: '#E6E6FA',
    fontWeight: '700',
    padding: '3%',
  },
});

export default UserTypeScreen;
