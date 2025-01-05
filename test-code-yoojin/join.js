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
  // 백엔드 API
  const API_URL = "http://localhost:80/api/register";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [existEmail, setExistEmail] = useState("");

  // 이메일 중복 확인
  const handleSignUp = () => {
    axios.get(API_URL + "exist", {params: {email: email}})
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

  // 회원가입 처리
  const onPressJoin = () => {
    let request = {
        email: email,
        password: password
    }

    if (request.email === "" || request.password === "") {
        Alert.alert("입력을 완료해주세요.");
    }
    else {
      axios.post(API_URL + "join", request)
      .then((response) => {
        console.log("data : ", response.data)
        if (response.data === 'success') {
          navigation.navigate('HomeScreen')
          Alert.alert("가입 성공!")
        }
        else {
          Alert.alert("가입 실패, 다시 시도해주세요")
        }
      })
      .catch((error) => console.log(error))
    }
  }

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
        <TouchableOpacity 
          style={styles.duplicateButton} 
          onPress={handleSignUp}>
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