// 좋아요 버튼 누르면 호출
const handleLikePress = ({ likes, isLiked, setLikes, setIsLiked, onLikeUpdate, postId }) => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setIsLiked(!isLiked);
    onLikeUpdate(post.id, newLikes);
};

export default handleLikePress;