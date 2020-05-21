import React , { Component } from "react";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent"
import Dishdetail from "./DishdetailComponent"
import { View } from "react-native";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"
    }
};

const Stack = createStackNavigator();

function MenuNavigator() {
  return(
      <Stack.Navigator screenOptions = {HeaderOptions}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Dishdetail" component={Dishdetail} />
      </Stack.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return(
    <HomeNavigator.Navigator initalRouteName ="Menu"
      screenOptions = {HeaderOptions} >
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return(
    <ContactNavigator.Navigator initalRouteName ="Contact Us"
      screenOptions = {HeaderOptions} >
      <HomeNavigator.Screen name="Contact Us" component={Contact} />
    </ContactNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return(
    <AboutNavigator.Navigator initalRouteName ="About Us"
      screenOptions ={HeaderOptions} >
      <AboutNavigator.Screen name="About Us" component={About} />
    </AboutNavigator.Navigator>
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
      <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} />
      <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {

  render() {
    return(
    <NavigationContainer>
      <View style={{flex:1}}>
        <MainNavigatorDrawer />
      </View>
    </NavigationContainer>
    );
  }
}

export default Main;
