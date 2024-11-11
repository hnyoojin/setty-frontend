import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PostItem = ({ item, navigation, updateLikes }) => (
  <TouchableOpacity 
    key={item.id} 
    onPress={() => navigation.navigate('PostDetailScreen', {
      post: item,
      onLikeUpdate: () => 
        updateLikes({ 
          postId: item.id, 
          newLikes: item.likes + 1 })
    })}
  >
    <View style={styles.postContainer}>
      <View style={styles.postItem}>
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postPreview}>{item.content}</Text>
          <Text style={styles.postInfo}>
            {item.createdAt} • {item.isAnonymous ? '익명' : item.author}
          </Text>
          <Text style={styles.postStats}>Likes {item.likes} • Comments {item.comments}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  postContainer: {
    alignSelf: 'center',
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 18,
    padding: 20,
  },
  postItem: {},
  postContent: {},
  postTitle: {
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  postPreview: {
    paddingBottom: 5,
  },
  postInfo: {
    marginTop: 5,
    fontSize: 14,
    color: '#6b7280',
  },
  postStats: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default PostItem;
