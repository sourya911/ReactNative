// import React from 'react';
// import { View, Text, Button, ScrollView } from 'react-native';

import Availshifts from "./components/Availshifts";
import MyShifts from "./components/Myshifts";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// import { Card } from 'react-native-paper';
const MyReactNativeComponent = () => {
  
  const Stack = createStackNavigator();
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="MyShifts" component={MyShifts} />
      <Stack.Screen name="Availaible" component={Availshifts} />
     
    </Stack.Navigator>
    </NavigationContainer>

  );
};

export default MyReactNativeComponent;
