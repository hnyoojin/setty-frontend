// 게시글 제목 & 내용 렌더링

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const PostHeader = ({ post, likes, comments, isLiked, onLikePress }) => (
  <View>
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.info}>{post.createdAt} | {post.isAnonymous ? '익명' : post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.stats}>Likes: {likes} • Comments: {comments}</Text>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onLikePress}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? '#7030B8' : '#999'}
          />
          <Text style={styles.buttonText}>{isLiked ? 'Unlike' : 'Like'}</Text>
        </TouchableOpacity>
      </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "92%",
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 18,
    marginBottom: 15,
    padding: 20,
  },
  title: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  stats: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex',
    marginTop: 2,
    marginLeft: 15,
    bottom: 10,
    paddingLeft: 0,
    backgroundColor: '#eee',
    width: 80,
    borderRadius: 4,
  },
  button: {
    flexDirection: 'row',    
    // backgroundColor: '#F3E9FF',
    padding: 6,
  },
  buttonText: {
    color: '#999',
    fontWeight: '700',
    paddingLeft: 2,
    paddingTop: 3,
    paddingBottom: 3,
  },
});

export default PostHeader;