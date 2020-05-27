import React , { Component } from "react";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import Dishdetail from "./DishdetailComponent";
import Favorites from "./FavoriteComponent";
import { View, ScrollView, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Reservation from "./ReservationComponent";
import { Icon } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { connect } from "react-redux";
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos} from "../redux/ActionCreators";

const mapStateToProps = state => {
  return{
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  }
}

const mapDispatchToProps = disptach => ({
  fetchDishes : () => disptach(fetchDishes()),
  fetchComments : () => disptach(fetchComments()),
  fetchLeaders : () => disptach(fetchLeaders()),
  fetchPromos : () => disptach(fetchPromos())
})

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"
    }
};

const MenuIcon = (props) => {
  return(
    <Icon name="menu" size={24} color="white"
      onPress = { () => props.navigation.toggleDrawer()} />
  );
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style = {styles.container} forceInset={{
        top:"always",horizontal:"never"
      }}
      >
    <View style={styles.drawerHeader}>
      <View style = {{flex:1}} >
        <Image source={require("./images/logo.png")} style={styles.drawerImage} />
      </View>
      <View style = {{flex:2}}>
        <Text style={styles.drawerHeaderText}> Ristorante Con Fusion</Text>
      </View>
    </View>
    <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
)

const Stack = createStackNavigator();
function MenuNavigator() {
  return(
      <Stack.Navigator screenOptions = {HeaderOptions}>
        <Stack.Screen name="Menu" component={Menu}
          options = { ({navigation}) => ({
            headerLeft: () => <MenuIcon navigation={navigation} />
          })
        }
        />
        <Stack.Screen name="Dishdetail" component={Dishdetail}/>
      </Stack.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return(
    <HomeNavigator.Navigator initalRouteName ="Menu"
      screenOptions = {HeaderOptions} >
      <HomeNavigator.Screen name="Home" component={Home}
        options = { ({navigation}) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />
        })
      }
      />
    </HomeNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return(
    <ContactNavigator.Navigator initalRouteName ="Contact Us"
      screenOptions = {HeaderOptions} >
      <HomeNavigator.Screen name="Contact Us" component={Contact}
        options = { ({navigation}) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />
        })
      }
      />
    </ContactNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return(
    <AboutNavigator.Navigator initalRouteName ="About Us"
      screenOptions ={HeaderOptions} >
      <AboutNavigator.Screen name="About Us" component={About}
        options = { ({navigation}) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />
        })
      }
      />
    </AboutNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();
function ReservationNavigatorScreen() {
  return(
    <ReservationNavigator.Navigator initialRouteName = "Reservation"
     screenOptions = {HeaderOptions} >
       <ReservationNavigator.Screen name= "Reserve Table" component={Reservation}
        options = { ({navigation}) => ({
          headerLeft : () => <MenuIcon navigation = {navigation} />
        })
      }
      />
     </ReservationNavigator.Navigator>
  );
}

const FavoritesNavigator = createStackNavigator();
function FavoritesNavigatorScreen() {
  return(
    <FavoritesNavigator.Navigator initialRouteName = "Favorites"
     screenOptions = {HeaderOptions} >
       <FavoritesNavigator.Screen name= "Favorites" component={Favorites}
        options = { ({navigation}) => ({
          headerLeft : () => <MenuIcon navigation = {navigation} />
        })
      }
      />
     </FavoritesNavigator.Navigator>
  );
}

const MainNavigator= createDrawerNavigator();
function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      initalRouteName="Home" drawerStyle={{
        backgroundColor : "#D1C4E9"
      }} drawerContent={props => <CustomDrawerContentComponent{...props} />}
      >
      <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} 
        options = {{
          drawerIcon : ({tintcolor}) => (
            <Icon name="home" type="font-awesome" size={24} color={tintcolor} />
          )
        }}
      />
      <MainNavigator.Screen name="Menu" component={MenuNavigator} 
        options = {{
          drawerIcon : ({tintcolor}) => (
            <Icon name="list" type="font-awesome" size={24} color={tintcolor} />
          )
        }}
      />
      <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} 
        options = {{
          drawerIcon : ({tintcolor}) => (
            <Icon name="address-card" type="font-awesome" size={22} color={tintcolor} />
          )
        }}
      />
      <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen} 
        options = {{
          drawerIcon : ({tintcolor}) => (
            <Icon name="info-circle" type="font-awesome" size={24} color={tintcolor} />
          )
        }}
      />
      <MainNavigator.Screen name="Favorites" component={FavoritesNavigatorScreen} 
        options = {{
          drawerIcon : ({tintcolor}) => (
            <Icon name="heart" type="font-awesome" size={24} color={tintcolor} />
          )
        }}
      />
      <MainNavigator.Screen name="Reserve Table" component={ReservationNavigatorScreen} 
        options = {{
          drawerIcon : ({tintcolor}) => (
            <Icon name="cutlery" type="font-awesome" size={24} color={tintcolor} />
          )
        }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchPromos();
    this.props.fetchComments();
  }

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

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  drawerHeader : {
    backgroundColor : "#512DA8",
    height : 140,
    alignItems : "center",
    justifyContent : "center" ,
    flex : 1,
    flexDirection : "row"
  },
  drawerHeaderText : {
    color : "white",
    fontSize : 24,
    fontWeight : "bold"
  },
  drawerImage : {
    margin : 10,
    width : 80,
    height : 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
