// 댓글 불러오기

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentItem = ({ item }) => (
  <View style={styles.commentItem}>
    <Text style={styles.author}>{item.isAnonymous ? '익명' : item.author} | {item.createdAt}</Text>
    <Text style={styles.commentContent}>{item.content}</Text>
  </View>
);

const styles = StyleSheet.create({
  commentItem: {
    alignSelf: "center",
    width: "92%",
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    padding: 15,
  },
  author: {
    fontSize: 14,
  },
  commentContent: {
    marginTop: 3,
    fontSize: 15,
  },
  postInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#6b7280',
  },
});

export default CommentItem;
