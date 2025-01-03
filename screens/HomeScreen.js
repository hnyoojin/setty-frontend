import React from 'react';
import {
  StyleSheet,
  View,
//  Text,
//  Button
} from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style = {styles.screen}>

        </View>
    )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E5D0FD',
    alignItems: 'left',
  },
  button: {
    backgroundColor: '#7030B8',
    fontSize: 600,
  },
});
