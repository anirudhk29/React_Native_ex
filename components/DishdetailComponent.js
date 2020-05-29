import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, Modal, Button, Alert, PanResponder } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import * as Animatable from "react-native-animatable";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return{
    dishes : state.dishes,
    comments : state.comments,
    favorites : state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite : (dishId) => dispatch(postFavorite(dishId)),
  postComment : (dishId, rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})

function RenderDish(props) {

  const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
    if(dx < -200) 
      return true;
    else
      return false;

  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder : (e, getsureState) => {
      return true;
    },
    onPanResponderEnd : (e, getsureState ) => {
      console.log("Pan responder end" ,  getsureState);
      if(recognizeDrag(getsureState)) 
        Alert.alert("Add Favorite",
         "Are you sure you wish to add "+dish.name+" to favorite?",
        [
          {
            text:"Cancel", onPress: () => console.log("Cancel Pressed"),
            style:"cancel"
          },
          {
            text: "OK", onPress: () =>{ props.favorite ? console.log("Already favourite")
            : props.onPress()}
          }
        ],
        {cancelable: false}   
        );
      return true;
    }
  })

  const dish = props.dish;
  if(dish != null) {
      return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers} >
          <Card featuredTitle = {dish.name}
            image={{uri : baseUrl + dish.image}}>
            <Text style={{margin : 10}}> {dish.description} </Text>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon raised reverse name={props.favorite ? "heart" : "heart-o"} type="font-awesome"
                color="#f50" onPress= {() => props.favorite ? console.log("Already favourite")
                : props.onPress()} />
            <Icon raised reverse name="pencil" type="font-awesome" onPress={()=> props.toggleModal()} />
            </View>
          </Card>
        </Animatable.View>
      );
  }
  else {
    return(
      <View></View>
    );
  }
}

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index}) => {
    return (
      <View key={index} style={{margin: 10}}>
        <Text style = {{fontSize: 14}}>{item.comment}</Text>
        <Rating imageSize={20} readonly startingValue={parseInt(item.rating)} style={{alignItems:"flex-start"}} />
        <Text style = {{fontSize: 12}}>{"--" + item.author + ", " + item.date} </Text>
      </View>
    );
  };
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000} >
      <Card title = "Comments" >
        <FlatList data = {comments} renderItem = {renderCommentItem}
          keyExtractor={ item => item.id.toString()} />
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends Component {

  constructor(props) {
    super(props);
    this.state ={
      showModal : false,
      rating:1,
      author:"",
      comment:""
    }
  }

  resetModal() {
    this.setState({
      rating:1,
      author:"",
      comment:""
    })
  }
  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  addComment(dishId, rating,author,comment) {
    this.props.postComment(dishId,rating,author,comment);
    this.resetModal();
    this.toggleModal();
  }
  render() {
    const {dishId} = this.props.route.params;
    return(
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
          favorite ={this.props.favorites.some(el => el===dishId)} 
          onPress={()=> this.markFavorite(dishId)} 
          toggleModal={()=> this.toggleModal()}  />
        <RenderComments comments ={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        <Modal animationType="fade" transparent={false} visible={this.state.showModal} 
          onDismiss={() => this.toggleModal()} onRequestClose={()=> this.toggleModal} >
          <View style={{  margin:10}}>
            <Rating showRating onFinishRating={(rate) => this.setState({rating: rate}) } />
            <Input placeholder="author" leftIcon={{type: "font-awesome" , name:"user-o"}} 
              onChangeText={(value) => this.setState({author: value})} />
            <Input placeholder="comment" leftIcon={{type:"font-awesome" ,name:"comment-o"}} 
              onChangeText={(value) => this.setState({comment: value})} />
            <Button onPress={() => this.addComment(dishId,this.state.rating,this.state.author,this.state.comment)} color="#512DA8" title="Submit" />
            <Button onPress={() => this.toggleModal()} color="#808080" title="Cancel" />
          </View>
        </Modal>
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
