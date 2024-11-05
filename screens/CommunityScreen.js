import React, {useState} from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

export default CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([
    { id: '1', 
      title: 'Test Post', 
      content: 'This is first Post.', 
      createdAt: '2024-10-08',        // 날짜&시간 API로? 불러와야 함
      author: 'TestUser',             // 사용자 id 불러와야함
      likes: 5, 
      comments: 2, 
      isAnonymous: false 
    },
  ]);

  const getFirstLine = (text, maxLength = 20) => {
    const firstLine = text.split('\n')[0];
    if (firstLine.length <= maxLength) {
      return firstLine;
    }
    return firstLine.split('').slice(0, maxLength).join('') + '...';
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postItem}>
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postPreview}>{getFirstLine(item.content)}</Text>
          <Text style={styles.postInfo}>{item.createdAt} • {item.isAnonymous ? '익명' : item.author}</Text>
          <Text style={styles.postStats}>Likes {item.likes} • Comments {item.comments}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewPost', { onPostCreated: (newPost) => {
            setPosts(currentPosts => [newPost, ...currentPosts]);
          }})}
        >
          <Text style={styles.buttonText}>글 작성하기</Text>
        </TouchableOpacity>
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
  // Post container style
  postContainer: {
    alignSelf: 'center',
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 18,
    padding: 20,
  },
  // post items style
  postItem: {
  },
  postContent: {
  },
  postTitle: {
    paddingBottom: 5,
    margin: 0,
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
