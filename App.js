import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Platform, View, Text} from 'react-native';

import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

import LoginScreen      from './screens/LoginScreen';     // Login
import UserTypeScreen   from './screens/UserTypeScreen';
import UserInfoScreen   from './screens/UserInfoScreen';
import HomeScreen       from './screens/HomeScreen';      // Home
import CalendarScreen   from "./screens/Calendar/CalendarScreen";  // Calendar
import ScheduleInput    from './screens/Calendar/ScheduleInput';
import MessageScreen    from "./screens/MessageScreen";   // Message

import GetCurrentDate from "./screens/Calendar/components/GetCurrentDate";
import GetScheduleDate from "./screens/Calendar/components/GetScheduleDate";
import GetScheduleTime from "./screens/Calendar/components/GetScheduleTime";
import CommunityScreen  from "./screens/Community/Community/CommunityScreen"; // Community
import SearchScreen     from './screens/Community/Community/SearchScreen';
import NewPostScreen    from "./screens/Community/NewPost/NewPostScreen";
import PostDetailScreen from "./screens/Community/PostDetail/PostDetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      
      initialRouteName="Home"

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          let iconName;

          if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Calendar')
            iconName = focused ? 'calendar' : 'calendar-outline';
          if (route.name === 'Message')
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          if (route.name === 'Community')
            iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: '#7030B8',
        tabBarInactiveTintColor: 'gray',
        
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          height: Platform.OS === 'ios' ? 80 : 70,
        },
        tabBarLabelStyle: {
          fontSize: Platform.OS === 'ios' ? 12 : 14,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home"      component={HomeScreen}      options={tabScreenOptions} />
      <Tab.Screen name="Calendar"  component={CalendarScreen}  options={tabScreenOptions} />
      <Tab.Screen name="Message"   component={MessageScreen}   options={tabScreenOptions} />
      <Tab.Screen name="Community" component={CommunityScreen} options={tabScreenOptions} />
    </Tab.Navigator>
  );
};

const tabScreenOptions = {
  headerStyle: { backgroundColor: '#E5D0FD' },
  headerTintColor: 'black',
  headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
  headerTitleAlign: 'center',
};

const App = () => {
  /*const [schedules, setSchedules] = useState([]); // schedule 상태 관리

  // 새로운 일정 추가 함수
  const addSchedule = (schedule) => {
    setSchedules([...schedules, schedule]);
  };*/
/*
  const [hello, setHello] = useState('');
  useEffect(()=>{
    axios.get("http://localhost:80/api/hello")
    .then(response=>setHello(response.data))
    .catch(error=>console.log(error))
  },[]);
  return (
    <View>
      <Text>{`${hello}`}</Text>
    </View>
  )
*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"    component={LoginScreen}     options={tabScreenOptions} />
        <Stack.Screen name="UserType" component={UserTypeScreen}  options={tabScreenOptions} />
        <Stack.Screen name="UserInfo" component={UserInfoScreen}  options={tabScreenOptions} />
        <Stack.Screen name="Home"     component={TabNavigator}    options={{ headerShown: false }} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={tabScreenOptions}/>  
        <Stack.Screen name="ScheduleInput" component={ScheduleInput} options={tabScreenOptions}/>
        <Stack.Screen name="GetScheduleDate" component={GetScheduleDate} options={tabScreenOptions} />
        <Stack.Screen name="GetScheduleTime" component={GetScheduleTime} options={tabScreenOptions} />
        
        <Stack.Screen name="Community"  component={CommunityScreen} options={tabScreenOptions}/>
        <Stack.Screen name="NewPost"    component={NewPostScreen} options={tabScreenOptions} />
        <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} options={tabScreenOptions} />
        <Stack.Screen name="SearchScreen"     component={SearchScreen} options={tabScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;