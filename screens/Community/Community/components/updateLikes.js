const updateLikes = ({ postId, newLikes }) => { 
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === postId ? { ...post, likes: newLikes } : post
    )
  );  
};

export default updateLikes;
