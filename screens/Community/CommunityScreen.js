import React, {useState} from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

const CommunityScreen =({navigation})=> {

  const getCurrentDate =()=> {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  const mockData = [
    {
      id: 0,
      title: 'thisistitle',
      content: 'thisisfirstpost',
      createdAt: getCurrentDate(),
      author: 'noname',
      likes: 5,
      comments: 2,
      isAnonymous: false,
    },
    {
      id: 1,
      title: 'thisistitle2',
      content: 'thisissecondpost',
      createdAt: getCurrentDate(),
      author: 'noname',
      likes: 7,
      comments: 2,
      isAnonymous: false,
    }
  ];
  const [posts, setPosts] = useState([mockData]);
  // 기본세팅 : 작성시간, 24시간 지나면 날짜로 표시

  const getFirstLine = (text, maxLength = 20) => {
    const firstLine = (text||'').split('\n')[0];
    return firstLine.length <= maxLength ? firstLine : `${firstLine.substring(0, maxLength)}...`;
  };
  const handleNewPost = (newPost) => {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };
  const renderItem = ({ item }) => (
    <PostItem item={item} />
  );
  const PostItem = ({ item }) => (
    <View style={styles.listWrapper}>
  {Array.isArray(item) ? (
    item.map((it) => (
      <TouchableOpacity 
        key={it.id} 
        onPress={() => navigation.navigate('PostDetailScreen', { post: it })}
      >
        <View style={styles.postContainer}>
          <View style={styles.postItem}>
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{it.title}</Text>
              <Text style={styles.postPreview}>{getFirstLine(it.content)}</Text>
              <Text style={styles.postInfo}>
                {it.createdAt} • {it.isAnonymous ? '익명' : it.author}
              </Text>
              <Text style={styles.postStats}>Likes {it.likes} • Comments {it.comments}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ))
  ) : (
    <Text>No posts available</Text> // item이 배열이 아닐 때 보여줄 텍스트
  )}
</View>

  );

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewPost', { onPostCreated: handleNewPost })}
          accessibilityLabel="글 작성하기"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>글 작성하기</Text></TouchableOpacity>
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

export default CommunityScreen;