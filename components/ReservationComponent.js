import React,{ Component } from "react";
import { Text, View, StyleSheet, Picker, Switch, Button, Alert, Platform} from "react-native"
import DatePicker from 'react-native-datepicker'
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests : 1,
            outdoor : false,
            date : "",
        }
    }

    handleReservation () {
        Alert.alert("Your Reservation OK",
             "Number of Guests : "+this.state.guests + "\n"+
             "Outdoors : "+this.state.outdoor + "\n"+
             "Date and Time :"+this.state.date + "\n",
             [
                 {
                    text:"Cancel", onPress: () => this.resetForm(),
                        style:"cancel"
                 },
                 {
                    text: "OK", onPress:  () => { this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                 }
             ],
             {cancelable: false}     
        );
        
    }

    resetForm() {
        this.setState({
            guests : 1,
            outdoor : false,
            date : ""
        });
    }

    async obtainNotificationPermisson() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== "granted") {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== "granted") {
                Alert.alert("Permission not granted to show notifications");
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermisson();
        
        Notifications.createChannelAndroidAsync("1",{
            name : "default",
            sound : true,
            vibrate : true,
        })
        .catch((error) => console.log(error));

        Notifications.presentLocalNotificationAsync({
            title: "Your Reservation",
            body : "Reservation for " + date + "requested",
            ios : {
                sound : true
            },
            android : {
                channelId : "1",
                color : "#512DA8"
            }
        });
        
    };

    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000} delay={1000} >
                <View style = {styles.formRow}>
                    <Text styles = {styles.formLabel}>Number of Guests</Text>
                    <Picker style = {styles.formItem} selectedValue = {this.state.guests}
                        onValueChange = {(itemValue, itemIndex) => this.setState({ guests: itemValue})}>
                        <Picker.Item label="1" value = "1" />
                        <Picker.Item label="2" value = "2" />
                        <Picker.Item label="3" value = "3" />
                        <Picker.Item label="4" value = "4" />
                        <Picker.Item label="5" value = "5" />
                        <Picker.Item label="6" value = "6" />
                    </Picker>
                </View>
                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Outdoor/Indoor?</Text>
                    <Switch style = {styles.formItem} value = {this.state.outdoor} 
                        trackColor = "#512DA8" onValueChange = {(value) => this.setState({ outdoor : value})} />
                </View>
                <View style = {styles.formRow}>
                    <Text style = {styles.formLabel}>Date and Time</Text>
                    <DatePicker style = {{flex:2, marginRight: 20}}
                        date={this.state.date} format="" mode="datetime"
                        placeholder="Select Date and Time" minDate = "2020-01-01"
                        confirmBtnText = "Confirm" cancelBtnText = "Cancel" 
                        customStyles = {{
                            dateIcon : {
                                position:"absolute",
                                left:0,
                                top:4,
                                marginLeft: 0
                            }
                        }}
                        onDateChange = {(date) => {this.setState({date:date})}} />
                </View>
                <View style = {styles.formRow}>
                    <Button onPress = {()=> this.handleReservation()} 
                        title = "Reserve" color="#512DA8" />
                </View> 
                
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow : {
        alignItems : "center",
        justifyContent : "center",
        flex : 1,
        flexDirection : "row",
        margin : 20
    },
    formLabel : {
        fontSize : 18,
        flex : 2
    },
    formItem: {
        flex : 1
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight:"bold",
        backgroundColor: "#512DA8",
        textAlign: "center",
        color: "white",
        marginBottom: 20
    },
    modalText : {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;