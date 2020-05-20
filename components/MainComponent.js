import React , { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent"
import { View } from "react-native";
import Home from "./HomeComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();

function MenuNavigator() {
  return(
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
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return(
    <HomeNavigator.Navigator initalRouteName ="Menu"
      screenOptions = {{
        headerStyle: {
          backgroundColor:"#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color:"#fff"
        }
      }} >
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  );
}

const MainNavigator= createDrawerNavigator();
function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      initalRouteName="Home" drawerStyle={{
        backgroundColor : "#D1C4E9"
      }} >
      <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} />
      <MainNavigator.Screen name="Menu" component={MenuNavigator} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {

  render() {
    return(
    <NavigationContainer>
      <MainNavigatorDrawer />
    </NavigationContainer>
    );
  }
}

export default Main;
