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
import API from "../API";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loginData = {
      email: email,
      password: password
  }
    if (email === "") {
      Alert.alert("이메일를 입력해 주세요.");
    }
    else if (password === "") {
      Alert.alert("비밀번호를 입력해 주세요.");
    }
    else {
      API.post('/login', loginData)
        .then((response) => {
          console.log(response.data);
          const { token, nickname } = response.data;

          AsyncStorage.setItem('token', token); // 토큰 저장  
          Alert.alert(`반갑습니다, ${nickname}님!`);
          
          navigation.navigate('Home');
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error('Error data : ', error.response.data);

            Alert.alert(`로그인 실패 : ${error.response.data.message}`);
          }
          else {
            console.error('Error : ', error);
            Alert.alert('로그인 중 문제 발생');
          }
        })
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        textContentType="password"
        placeholder="비밀번호"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <View style={styles.button}>
        {/* 로그인 버튼 */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => handleLogin()}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
        
        {/* 회원가입 버튼 */}
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={() => navigation.navigate('UserType')}>
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