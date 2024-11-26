import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import getCurrentDate from '../../components/getCurrentDate';
import PostList       from './components/PostList';

const CommunityScreen = ({ navigation }) => {
  const mockData = [
    {
      id: 0,
      title: 'thisistitle',
      content: 'thisisfirstpost',
      createdAt: getCurrentDate(),
      author: 'noname',
      likes: 1,
      comments: 2,
      isAnonymous: false,
    },
    {
      id: 1,
      title: 'thisistitle2',
      content: 'thisissecondpost',
      createdAt: getCurrentDate(),
      author: 'noname',
      likes: 2,
      comments: 2,
      isAnonymous: false,
    }
  ];

  const [posts, setPosts] = useState(mockData);

  const handleUpdatePost = (postId, updatedLikes, updatedComments) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: updatedLikes, comments: updatedComments } : post
      )
    );
  };

  return (
    <View style={styles.screenContainer}>
      <PostList posts={posts} navigation={navigation} updateLikes={handleUpdatePost} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewPost', { onPostCreated: (newPost) => setPosts([newPost, ...posts]) })}
        >
          <Text style={styles.buttonText}>글 작성하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#E5D0FD',
  },
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

export default CommunityScreen;
