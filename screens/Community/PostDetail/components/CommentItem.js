// 댓글 불러오기

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CommentHeader from './CommentHeader';

const CommentItem = ({ item }) => (
  <View style={styles.commentItem}>
    <CommentHeader item={item}/>
    <Text style={styles.commentContent}>{item.content}</Text>
    <Text style={styles.postInfo}>{item.createdAt}</Text>
  </View>
);

const styles = StyleSheet.create({
  commentItem: {
    alignSelf: "center",
    width: "92%",
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    padding: 15,
  },
  commentContent: {
    marginTop: 8,
    fontSize: 15,
  },
  postInfo: {
    marginTop: 7,
    marginLeft: 1.5,
    fontSize: 12,
    color: '#6b7280',
  },
  date: {
    fontSize: 14,
  },
});

export default CommentItem;