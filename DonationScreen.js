import  React, {Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class DonationScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      requestedItemsList : [],
      itemName:'',
  currencyCode:''
    }
 
  }
  getRequestedItemsList =()=>{
    this.requestRef = db.collection("requested_Itemss")
    .where('user_id','==',this.state.userId)
    .where("Items_status", '==','received')
    .onSnapshot((snapshot)=>{
      var ReceivedItemsList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        ReceivedItemsList : ReceivedItemsList
      });
    })
  }
  getData(){
    fetch("http://data.fixer.io/api/latest?access_key=17bbbf9f66fbe40ea292e3f010e418cc").then(response=>{
      return response.json();
    }).then(responseData=>{
      var currencyCode= this.state.currencyCode;
      var currency = responseData.rates.INR;
      var value =69/currency;
      console.log(value);
    })

  }

  componentDidMount(){
    this.getRequestedItemsList()
  }


  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.Items_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
              onPress ={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details": item})
              }}
              >
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="All items" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All  Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
