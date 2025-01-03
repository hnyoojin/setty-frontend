import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (userEmail === '') {
      Alert.alert('이메일을 입력해주세요.');
    } else if (password === '') {
      Alert.alert('비밀번호를 입력해주세요.');
    } else if (userEmail !== 'testUser' || password !== '1234') {
      Alert.alert('이메일 또는 비밀번호가 틀렸습니다.');
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={userEmail}
        onChangeText={setUserEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.button}>
        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('UserType')}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:'4%',
    backgroundColor: '#E5D0FD',
  },
  input: {
    flex: 0.04,
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    marginVertical: '2%',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    width: '25%',
    color: 'white',
    fontWeight: '700',
    marginTop: '5%',
    backgroundColor: '#7030B8',
    padding: '3%',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    marginLeft: '23%',
  },
  signUpButton: {
    width: '25%',
    color: 'white',
    fontWeight: '700',
    marginTop: '5%',
    backgroundColor: '#7030B8',
    padding: '3%',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    marginRight: '23%',
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  signUpText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
});

export default LoginScreen;