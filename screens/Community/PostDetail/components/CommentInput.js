// 댓글 입력창 & 전송 버튼

import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentInput = ({ input, setInput, onSubmit }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={input}
      onChangeText={setInput}
      placeholder="댓글을 입력하세요"
    />
    <TouchableOpacity style={styles.sendButton} onPress={onSubmit}>
      <Ionicons
        name={'paper-plane-outline'}
        size={24}
        color={'white'}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#B697D9',
    borderRadius: 5,
    padding: '4%',
    marginRight: '5%',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#7030B8',
    padding: '3%',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default CommentInput;
