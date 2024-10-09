import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';

const AppNavigator = createStackNavigator(
  {
    ChatList: ChatListScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'ChatList',
  }
);

export default createAppContainer(AppNavigator);
