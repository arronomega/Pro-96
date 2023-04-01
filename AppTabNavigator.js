import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DonationScreen from '../screens/DonationScreen';
import SellScreen from '../screens/SellScreen';



export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks : {
    screen: DonationScreen,
    navigationOptions :{
    
      tabBarLabel : "All items",
    }
  },
  Sell: {
    screen: SellScreen,
    navigationOptions :{
  
      tabBarLabel : "Donate Item",
    }
  }
});
