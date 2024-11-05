import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.screenContainer}>
        <View style={styles.container}> 
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.info}>
              {post.createdAt} | {post.isAnonymous ? '익명' : post.author}
            </Text>
            <Text style={styles.content}>{post.content}</Text>
            <Text style={styles.stats}>
              Likes: {post.likes} • Comments: {post.comments}
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#E5D0FD",
  },
  container: { 
    alignSelf: "center",
    width: "92%",
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 18,
    padding: 20,
  },
  title: { 
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: { 
    fontSize: 16, 
    marginTop: 20,
    marginBottom: 20 
  },
  info: { 
    fontSize: 12, 
    color: '#999', 
    marginBottom: 10,
    marginTop: 10, 
  },
  stats: { 
    fontSize: 12, 
    color: '#999',
    marginTop: 10, 
  },
});

export default PostDetailScreen;
