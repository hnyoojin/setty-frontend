// 댓글 입력창 & 전송 버튼

import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const CommentInput = ({ input, setInput, onSubmit }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={input}
      onChangeText={setInput}
      placeholder="댓글을 입력하세요"
    />
    <TouchableOpacity style={styles.sendButton} onPress={onSubmit}>
      <Text style={styles.sendButtonText}>전송</Text>
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
    borderColor: '#7030B8',
    borderWidth: 1,
    borderRadius: 5,
    padding: '3%',
    marginRight: '5%',
  },
  sendButton: {
    backgroundColor: '#7030B8',
    padding: '3%',
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
  },
});

export default CommentInput;
