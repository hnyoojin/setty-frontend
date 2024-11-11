import React from 'react';
import { FlatList } from 'react-native';

import PostItem from './PostItem';

const PostList = ({ posts, navigation, updateLikes }) => (
  <FlatList
    data={posts}
    renderItem={({ item }) => (
      <PostItem 
        item={item} 
        navigation={navigation} 
        updateLikes={updateLikes} 
      />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);

export default PostList;
