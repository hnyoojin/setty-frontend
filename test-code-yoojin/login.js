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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = () => {
      if (email.trim() === "") {
          Alert.alert("이메일를 입력해 주세요.");
      }
      else if (password.trim() === "") {
          Alert.alert("비밀번호를 입력해 주세요.");
      }
      else {
          axios.post("api/UserInfoScreen",
              null,
              { params: {email: email, password: password} }
          ).then(function(response) {
              console.log(response.data);
              if (response.data !== null && response.data !== "") {
                  console.log("로그인 성공!!");
                  navigation.navigate('HomeScreen');
              }
              else {
                  Alert.alert("로그인 실패", "이메일이나 비밀번호를 확인하세요.");
                  setEmail("");
                  setPassword("");
              }
          }).catch(function(error) {
                  console.log(`Error Message: ${error}`);
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