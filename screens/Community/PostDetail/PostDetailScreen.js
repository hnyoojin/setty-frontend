import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import getCurrentDate from '../../components/getCurrentDate';
import PostHeader     from './components/PostHeader';
import CommentItem    from './components/CommentItem';
import CommentInput   from './components/CommentInput';

const PostDetailScreen = ({ route }) => {
  const { post, onLikeUpdate } = route.params;

  const [input, setInput] = useState('');
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const mockData = [
    {
      postId: 0,
      id: 0,
      content: '히히 안녕하세요',
      createdAt: getCurrentDate(),
      author: '황유진',
      likes: 1,
      isAnonymous: false,
    },
    {
      postId: 1,
      id: 0,
      content: '안녕하세요... 도와주세요',
      createdAt: getCurrentDate(),
      author: '왕왕',
      likes: 1,
      isAnonymous: false,
    }
  ];
  const [comments, setComments] = useState(mockData);


  const postComment = () => {
    if (input.trim()) {
      const newComment = {
        postId: post.id,
        id: Date.now().toString(),
        content: input,
        createdAt: getCurrentDate(),
        author: isAnonymous ? '익명' : '사용자',
        likes: 0,
        isAnonymous: false,
      };
      setComments([...comments, newComment]);
      setInput('');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          item.postId === post.id ? <CommentItem item={item} /> : null // 조건부 렌더링
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <PostHeader
            post={post}
            likes={likes}
            comments={comments}
            isLiked={isLiked}
            onLikePress={() => {
              setLikes(isLiked ? likes - 1 : likes + 1);
              setIsLiked(!isLiked);
            }}
          />
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 100}
        style={styles.screen}
        keyboardVerticalOffset={90}
      >
        <CommentInput 
          input={input}  
          setInput={setInput} 
          onSubmit={postComment} 
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#E5D0FD",
  },
  screen: {
    padding: 15,
    marginBottom: 30,
  },
});

export default PostDetailScreen;
