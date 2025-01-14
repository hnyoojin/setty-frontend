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
import API from "../API";

const UserInfoScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [errors, setErrors] = useState({});

  // 이메일 중복 확인
  const checkEmail = () => {
    axios.get(API + "exist", {params: {email: email}})
    .then((response) => {
        if (response.data.email === email) {
            setExistEmail('exist Email')
            email = ""
            setEmail("")
            console.log(email)
        }
        else {
            setExistEmail("")
        }
    })
    .catch((error) => console.log(error))
  }

  // 닉네임 중복 확인
  const chechNickname = () => {

  }

  // 회원가입 처리
  const onPressJoin = () => {
    const userData = {
        email: email,
        nickname: nickname,
        password: password
    }

    if (userData.email === "" || userData.nickname === "" || userData.password === "") {
        Alert.alert("입력을 완료해주세요.");
    }
    else if (userData.password !== confirmPW){
      Alert.alert("비밀번호가 다릅니다.");
    }

    else {
      API.post('/register', userData)
      .then((response) => {
        console.log(response.data);
        Alert.alert(`환영합니다, ${nickname}님!`);
        setErrors({});
        navigation.navigate('Home');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error('Error data : '. error.response.data);
          setErrors(error.response.data);
          // Alert.alert(`가입 실패 : ${error.response.data.error}`);
          Alert.alert("[이메일 형식]\nexample@gmail.com\n\n[비밀번호 규칙]\n영문 대,소문자 포함\n 숫자, 특수기호 하나 이상 포함\n 8자 ~ 20자");
        }
        else {
          console.error('Error: ', error);
          Alert.alert('Error');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity 
          style={styles.duplicateButton} 
          onPress={checkEmail}>
          <Text style={styles.duplicateButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />
        <TouchableOpacity 
          style={styles.duplicateButton} 
          onPress={chechNickname}>
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
          value={confirmPW}
          onChangeText={setConfirmPW}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity 
        style={styles.signUpButton} 
        onPress={onPressJoin}>
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