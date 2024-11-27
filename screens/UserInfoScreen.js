import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  TouchableOpacity, 
  StyleSheet,
  Platform
} from 'react-native';
import axios from 'axios';

const UserInfoScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // 백엔드 API
  const API_URL = '';

  // axios 사용한 버전
  const handleSignUp = async () => {
    if (userEmail === '' || password === '' || confirmPassword === '') {
      Alert.alert('입력을 완료해 주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    const requestData = {
      email: userEmail,
      password: password,
    }

    try {
      // POST 요청
      const response = await axios.post(API_URL, requestData);

      // 서버 응답 처리
      if (response.status === 200 && response.data.success) {
        Alert.alert('회원가입 성공', response.data.message);
        navigation.navigate('Home');
      } else {
        Alert.alert('회원가입 실패', response.data.error || 'Unknown Error');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류 발생', '네트워크 문제 or 서버 오류 발생');
    }
  };
  // fetch 사용한 버전
  /*
  const handleSignUp = async() => {
    if (userEmail === '' || password === '' || confirmPassword === '') {
      Alert.alert('입력을 완료해 주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    // API 요청 데이터 형식??
    const requestData = {
      email: userEmail,
      password: password,
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // 서버 응답
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        Alert.alert('회원가입 성공', responseData.message);
        navigation.navigate('Home');
      } 
      else {
        Alert.alert('회원가입 실패', responseData.error || 'Unknown Error');
      }
    }
    catch (error) {
      console.error(error);
      Alert.alert('오류 발생', '네트워크 문제 or 서버 오류 발생');
    }
  }
  */
  return (
    <View style={styles.container}>
      {showAlert && (
        <View style={styles.alertBox}>
          <Text>{alertMessage}</Text>
          <Button title="확인" onPress={() => setShowAlert(false)} />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <TouchableOpacity style={styles.duplicateButton} onPress={handleSignUp}>
          <Text style={styles.duplicateButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        {passwordError && <Text style={styles.errorText}>비밀번호가 다릅니다.</Text>}
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>회원가입</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    paddingHorizontal: 10,
    padding: '1%',
  },
  duplicateButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    marginLeft: 10,
  },
  duplicateButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  signUpButton: {
    backgroundColor: '#6A5ACD',
    padding: '3.5%',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alertBox: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default UserInfoScreen;