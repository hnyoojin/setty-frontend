import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    FlatList, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

export default function MessageScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { id: messages.length.toString(), text: input }]);
            setInput('');
            // 여기에 AI 챗봇 API 호출 코드를 추가하면 될듯합니당...
            // 사실 잘 모르겟서요..
        }
    };

    return (
        // 입력창 클릭시, 입력창이 키보드 위로 가게 하는 코드
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 100}
            style={styles.screen}
            keyboardVerticalOffset={90}
        >
            {/* 채팅 기록을 FlatList 보여주는 코드 */}
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
            {/* 메시지 입력창 */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="메시지를 입력하세요"
                />

                {/* 터치 효과를 주는 전송 버튼입니당 */}
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>전송</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#E5D0FD',
        padding: Platform.OS === 'ios' ? '5%' : 15,
    },
    listContainer: {
        paddingBottom: Platform.OS === 'ios' ? '0%' : 0,
    },
    messageContainer: {
        alighSelf: 'flex-end',
        marginVertical: '1%',
        borderRadius: Platform.OS === 'ios' ? '5%' : 5,
    },
    message: {
        backgroundColor: '#fff',
        padding: '3%',
        borderRadius: Platform.OS === 'ios' ? '10%' : 20,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? '5%' : 15,
    },
    input: {
        flex: 1,
        borderColor: '#7030B8',
        borderWidth: 1,
        borderRadius: 5,
        borderRadius: Platform.OS === 'ios' ? '2.5%' : 5,
        padding: '3%',
        marginRight: '5%',
        marginBottom: Platform.OS === 'ios' ? '3%' : 0,
    },
    sendButton: {
        backgroundColor: '#7030B8',
        padding: '3%',
        borderRadius: Platform.OS === 'ios' ? '2.5%' : 3,
        marginBottom: Platform.OS === 'ios' ? '3%' : 0,
    },
    sendButtonText: {
        color: '#fff',
    },
});