import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyBarterScreen from '../screens/MyBarter';
import SettingScreen from '../screens/SettingScreen';
import Notification from '../screens/Notifications';
export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyBarter:{
      screen :MyBarterScreen
    },
    Notification : {
    screen : Notification
  },
 
  Setting : {
    screen : SettingScreen
  }
},

  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
