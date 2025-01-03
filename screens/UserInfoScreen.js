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

const UserInfoScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const checkDuplicateEmail = () => {
    if (userEmail === 'existingUser') {
      Alert.alert('사용 불가한 이메일입니다.');
      setShowAlert(true);
    } else {
      Alert.alert('사용 가능한 이메일입니다.');
    }
  };

  const handleSignUp = () => {
    if (userEmail === '') {
      Alert.alert('이메일을 입력해주세요.');
      //setShowAlert(true);
    } else if (password === '') {
      Alert.alert('비밀번호를 입력해주세요.');
      //setShowAlert(true);
    } else if (password !== confirmPassword) {
      //setPasswordError(true);
    } else {
      navigation.navigate('Home');
    }
  };

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
        <TouchableOpacity style={styles.duplicateButton} onPress={checkDuplicateEmail}>
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