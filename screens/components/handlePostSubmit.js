const handlePostSubmit = () => {
    const newPost = [{
        id: Date.now().toString(),
        title,
        content,
        author: isAnonymous ? '익명' : '사용자',
        createdAt: new Date().toISOString().split('T')[0],
        likes: 0,     // 좋아요 기능 추후 추가
        comments: 0,  // 댓글 기능 추후 추가
        isAnonymous,
    }];
    route.params.onPostCreated(newPost);
    navigation.goBack();
};

export default handlePostSubmit;