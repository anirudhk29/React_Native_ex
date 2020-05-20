import "react-native-gesture-handler";
import React from 'react';
import Menu from "./components/MenuComponent";
import Dishdetail from "./components/DishdetailComponent";
import { View, Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack=createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{
        headerStyle: {
          backgroundColor:"#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color:"#fff"
        }
      }}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Dishdetail" component={Dishdetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
