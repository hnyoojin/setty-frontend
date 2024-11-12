// 댓글 불러오기
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CommentHeader = ({ item }) => {
    
    const [likes, setLikes] = useState(item.likes);
    const [isLiked, setIsLiked] = useState(false);

    const onReplyPress=()=>{};
    const onLikePress = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };
    const onEllipPress=()=>{};

    return (
        <View style={styles.CommentHeaderContainer}>
            <Image style={styles.photo}
                source={{url:'https://th.bing.com/th/id/OIP.q8K6plagD1gdoEId1opCbQHaG6?w=202&h=189&c=7&r=0&o=5&pid=1.7'}}
            />
            <Text style={styles.author}>{item.isAnonymous ? '익명' : item.author}</Text>
        
            <View style={styles.buttons}>
        
            {/*Reply on Comment Button*/}
                <TouchableOpacity style={styles.reply} onPress={onReplyPress}>
                    <Ionicons
                        name={'chatbubble-outline'}
                        size={15}
                        color={'#999'}
                    />
                </TouchableOpacity>
            {/*Comment Like Button*/}
                <TouchableOpacity 
                    style={styles.likes} 
                    onPress={onLikePress}
                >
                    <Ionicons
                        name={isLiked ? 'heart' : 'heart-outline'}
                        size={15}
                        color={isLiked ? '#7030B8' : '#999'}
                    />
                </TouchableOpacity>
            {/*Report & Send message & ...*/}
                <TouchableOpacity style={styles.ellip} onPress={onEllipPress}>
                    <Ionicons
                        name={'ellipsis-vertical-outline'}
                        size={15}
                        color={'#999'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CommentHeaderContainer: {
        flexDirection: 'row',
    },
    photo: {
        height: 25,
        width: 25,
        flexDirection: 'row',
        borderRadius: 4,
        marginRight: 3,
    },
    author: {
        flexDirection: 'row',
        fontSize: 15,
        padding: 3,
        marginTop: 2.5,
    },
    buttons: {    
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 2.5,
        right: 3,
        padding: 5,
        backgroundColor: '#F3E9FF',
        borderRadius: 4,
    },
    reply: {
        marginLeft: 7,
        marginRight: 9,
    },
    likes: {
        marginRight: 7,
    },
    ellip: {
        marginRight: 5,
    },
});
export default CommentHeader;