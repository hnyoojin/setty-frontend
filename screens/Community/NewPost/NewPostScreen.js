import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, SafeAreaView, Switch, TouchableOpacity, ScrollView, Platform, Keyboard } from 'react-native';

import getCurrentDate from '../../components/getCurrentDate';

const NewPost = ({ route, navigation }) => {

  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handlePostSubmit = () => {
    const newPost = {
        id: Date.now().toString(),
        title: title,
        content: content,
        author: isAnonymous ? '익명' : '사용자',
        createdAt: getCurrentDate(),
        likes: likes,
        comments: comments,
        isAnonymous: false,
    };
    route.params.onPostCreated(newPost);
    navigation.goBack();
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
          {/*Title Input*/}
          <TextInput
            style={styles.inputTitle}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          {/*toggle button : anonymous <-> user name*/}
          <View>
            <Text style={styles.anonymousToggle}>
              {isAnonymous ? 'anonymous' : 'user name'} {/* 상태에 따른 텍스트 변경 */}
            </Text>
            <Switch
              style={styles.switch}
              value={isAnonymous}
              onValueChange={(value) => setIsAnonymous(value)} // 스위치 값 변경 시 상태 업데이트
            />
          </View>

          <TextInput
            style={styles.inputContent}
            placeholder="내용을 입력하세요"
            multiline
            value={content}
            onChangeText={setContent}
            onBlur={() => Keyboard.dismiss()}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePostSubmit}>
              <Text style={styles.buttonText}>작성 완료</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // screen style
  screenContainer: {
    flex: 1,
    backgroundColor: '#E5D0FD',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5D0FD',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  inputTitle: {
    flex: 0.04,
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    marginVertical: '2%',
    padding: 10,
  },
  // switch: {},
  inputContent: {
    minHeight: Platform.OS === 'ios' ? '100%' : 150,
    maxHeight: Platform.OS === 'ios' ? '150%' : 150,
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'ios' ? '5%' : 10,
    marginTop: 20,
    padding: 10,
  },
  anonymousToggle: {
    color: 'gray',
    fontWeight: 800,
    fontSize: Platform.OS === 'ios' ? 16 : 16,
  },
  // contentInput: {},
  
  // button style
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#7030B8',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: '#E6E6FA',
    fontWeight: '700',
  },
});

export default NewPost;