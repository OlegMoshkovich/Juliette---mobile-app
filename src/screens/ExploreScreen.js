import React from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Text, View, TouchableOpacity,Image, TouchableHighlight,ScrollView,Toggle, Alert, Animated} from 'react-native';
import Deck from '../Deck';
import {StackNavigator,TabNavigator, TabBarBottom} from 'react-navigation';
import { LinearGradient } from "expo";
import {Card, Button,Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const DATA = [
  { id: 1, title: 'Oyster-tecture', uri: 'https://99percentinvisible.org/app/uploads/2017/10/new-york-estuary.jpg' , text:'Standing on the sidewalk in Manhattan’s financial district in the shadows of glass skyscrapers, it is easy to forget how close you are to the water. But just a few blocks away, there are docks, and sea gulls, and ferry boats ready to take you island hopping.'},
  { id: 2, title: 'Women and Guns', uri: 'https://hips.hearstapps.com/mac.h-cdn.co/assets/16/06/1455152746-bottomgun.jpg?fill=320:259&resize=320:*',text:'Beneath the surface of the guns discussion in America—one traditionally dominated by men—theres a complex world of females and firearms. Here, in the following 10 stories, we shed light on what often goes unseen: how women feel about, live with, and die by guns.' },
  { id: 3, title: 'The Fear of Water in Flint', uri: 'https://res.cloudinary.com/versemedia/image/fetch/q_60,c_fill,f_auto,fl_lossy,dpr_2.0/https://verse-api-image-source-files.s3.amazonaws.com/users/c92a4fcbaefff57714cf443cc322229f84d1af52/i1v308nuyk4daer5.jpg',text:'The story of the poisoning of the water in Flint, Michigan, has become a dark fable about government negligence, woeful infrastructure, and the hubris of public officials. ' },
  { id: 4, title: 'A Brief History of Speedrunning', uri: 'https://readonlymemory.vg/wp-content/uploads/2017/02/s_2-1280x1280.jpg',text:'Of all the iD Software games from the early ’90s, I only hazily remember Wolfenstein 3D at best. My mother’s big beige block PC in her upstairs office had it installed.' },
  { id: 5, title: 'Summertime Instagram catch', uri: 'https://s20843.pcdn.co/wp-content/uploads/2013/07/photo-38.jpg',text:'Close your eyes and imagine the spoils of travel: different cultures, breathtaking vistas, exotic foods. You might picture zooming down a zip line in the Amazon, tasting a classic New York hot dog, ' },
];

class ExploreScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moveAnim     : new Animated.Value(0),
      activated    : true,
      fadeAnim : new Animated.Value(0),
      blurRadius: 0,
    };

  }

  animate = () => {
    if (this.state.blurRadius == 10) {
      this.setState({
        blurRadius: 0
      });
    } else {
      this.setState({
        blurRadius: 10
      });
    }

    Animated.timing(
        this.state.fadeAnim,
        {
          toValue: this.state.activated ? 1: 0,
          duration: 500,
        }
      ).start();
      this.setState({
        activated : !this.state.activated,
        }
      )
  }
  _onPressButton() {
    Alert.alert(
    'Ava',
    'Short Press',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
    )
    }

  renderCard = (item) => {
    return(

      <Card
        key = {item.id}
        containerStyle ={{position:'absolute',backgroundColor:"white",borderColor: "lightgrey",borderRadius: 7,height: 460,width:width-50,left:12}}>
        <Text style ={{marginBottom:19,color:"black",fontSize: 10,fontWeight:'normal' }}>Source, duration </Text>
        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate('MyModal', {
              text: item.text,
              title: item.title,
              image_uri: item.uri,
            });
          }}>
        <Text style ={{marginBottom:24,color:"black",fontSize: 22,fontWeight:'bold' ,textDecorationLine:'underline'}}>{item.title} </Text>
        </TouchableOpacity>
        <Text style ={{marginBottom:17,color:"black"}}>{item.text}</Text>
          <Image
             style={{height: 225}}
             resizeMode="cover"
             source={{ uri:item.uri }}
           />
      </Card>

    )
  }

  render() {
    return (
      <LinearGradient
       colors={['#4fb6de', '#94D7E0', 'white']}
       style={{ height: height, width:width}
       }>


        <View style ={{
         top:20,
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-between'
          }}>
            <Text style ={{color:"white",fontSize: 40,fontFamily: 'Helvetica', fontWeight:'bold', margin:15}}>#explore</Text>
            <TouchableOpacity style ={{margin:20}}
            onPress={() => this.props.navigation.navigate({
              routeName: 'Home',
                  params: {
                      transition: 'left'
                  }
                }
            )}>
            <Image
              style={{height: 40,width: 40}}
              source={require('../../assets/Explore-icon.png')}
            />
          </TouchableOpacity>
        </View>

        <View //E
          style={{
            position:'absolute',
            top:30
          }}>

          <Deck
          data = {DATA}
          renderCard = {this.renderCard}
          renderNoMoreCards = {this.renderNoMoreCards}/>

        </View>




        <View style={{ //Navigational Menu
          flex:1,
          flexDirection: 'row',
          position: 'absolute',
          bottom: this.state.activated ? -50: 30,
          left:20

          }}>
            <TouchableOpacity style ={{margin:5}}  onPress={() => this.props.navigation.navigate('Explore')}>
            <Image
              style={{height: 35,width: 35}}
              source={require('../../assets/Explore-icon.png')}
            />
            </TouchableOpacity>
            <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Map')}>
            <Image
              style={{height: 35,width: 35}}
              source={require('../../assets/Map-icon.png')}
            />
            </TouchableOpacity>
            <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Community')}>
            <Image
              style={{height: 35,width: 35}}
              source={require('../../assets/Community-icon.png')}
            />
            </TouchableOpacity>
            <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Calendar')} >
            <Image
              style={{height: 35,width: 35}}
              source={require('../../assets/Calendar-icon.png')}
            />
            </TouchableOpacity>
            <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Shop')} >
            <Image
              style={{height: 35,width: 35}}
              source={require('../../assets/Shop-icon.png')}
            />
            </TouchableOpacity>
        </View>

        <TouchableOpacity //Ava
              style = {{
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: this.state.activated ? -100:-50,
              right: 20,
              width: this.state.activated ? 100: 100,
              height: this.state.activated ? 150: 150,
              }}
              onPress={this.animate} onLongPress={this.animate}>
              <Image
                style={{height:100,width:100,}}
                source={require('../../assets/Nav_Avatar_Face_Animations.png')}
              />
        </TouchableOpacity>

      </LinearGradient>
    );
  }
}

export default ExploreScreen;