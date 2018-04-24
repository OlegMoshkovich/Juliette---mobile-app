import React from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Text, View, TouchableOpacity,Image, TouchableHighlight,ScrollView,Toggle, Alert, Animated} from 'react-native';
import {StackNavigator,TabNavigator, TabBarBottom} from 'react-navigation';
import { LinearGradient } from "expo";
import {Card, Button,Icon} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const {width, height} = Dimensions.get('window');

class ShopScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Image
            style={{height: 40,width: 40, right:20}}
            source={require('../assets/Calendar-icon.png')}
          />
        </TouchableOpacity>

      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{height: 40,width: 40,left:20}}
            source={require('../assets/Explore-icon.png')}
          />
        </TouchableOpacity>
      )
    };
  };


  render() {
    return (

        <LinearGradient
         colors={['#56CCF2', '#56CCF2', 'white']}
         style={{ height: height, width:width}}>
         <Text style ={{color:"white",fontSize: 22,top:30,left:30,fontWeight:'bold', }}>Featured</Text>
         <ScrollView>
             <ScrollView horizontal= {true} style={{marginTop:40}}>
             <Image
                style={{height: 401,width:336,marginBottom:10,marginTop:10,marginRight:10,marginLeft:10,left:20}}
                resizeMode="cover"
                 source={require('../assets/Shop_Image.png')}
              />
              <Image
                 style={{height: 401,width:336,marginBottom:10,marginTop:10,marginRight:10,marginLeft:10,left:20}}
                 resizeMode="cover"
                  source={require('../assets/Shop_Image.png')}
               />
               <Image
                  style={{height: 401,width:336,marginBottom:10,marginTop:10,marginRight:10,marginLeft:10,left:20}}
                  resizeMode="cover"
                   source={require('../assets/Shop_Image.png')}
                />

             </ScrollView >
             <Text style ={{color:"white",fontSize: 22,left:30,fontWeight:'bold',marginBottom:10 }}>Whats New</Text>

             <ScrollView horizontal= {true} style={{marginBottom:200}} >
             <Image
                style={{height: 212,width:156,marginBottom:10,marginTop:10,marginRight:10,marginLeft:10,left:20}}
                resizeMode="cover"
                source={require('../assets/Shop_Image3.png')}
              />

              <Image
                 style={{height: 212,width:156,marginBottom:10,marginTop:10,marginRight:10,marginLeft:10,left:20}}
                 resizeMode="cover"
                 source={require('../assets/Shop_Image3.png')}
               />
               <Image
                  style={{height: 212,width:156,marginBottom:10,marginTop:10,marginRight:10,marginLeft:10,left:20}}
                  resizeMode="cover"
                  source={require('../assets/Shop_Image3.png')}
                />


             </ScrollView >

         </ScrollView>

      </LinearGradient>
    );
  }
}
export default ShopScreen;
