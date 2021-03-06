import React from 'react';
import Dimensions from 'Dimensions';
import { View, Image, Animated} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from "expo";
import CollapseView from "react-native-collapse-view";
import GestureRecognizer from 'react-native-swipe-gestures';

import AvaBottomMenu from '../components/AvaBottomMenu';
import TopMenu from '../components/TopMenu';

import assetPaths from '../assetPaths';
import s from '../styles/chatscreen';


const color = '#FFF2AD';
const {width, height} = Dimensions.get('window');

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: 'I\'m ready to get swiped!',
      moveAnim     : new Animated.Value(1),
      activated    : true,
      valueInitial : 0,
      valueFinal   : 0
    };
  }

  animate = () => {
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: 1,
        duration: 10000,
      }
    ).start();

    this.setState({
       activated : !this.state.activated,
       valueInitial: this.state.activated? 0 : -150,
       valueFinal:this.state.activated? -150 : 0
      }
    )
  }

  _renderView1 = (collapse) => {
    return(
      <View style={s.view}>
        <Image
          style={{height: 156/3,width: 1059/3}}
          source={require('../../assets/Chat_ConvoComponent0.png')} />
      </View>
    )
  }
  _renderCollapseView1 = (collapse) => {
    return(
      <View style={s.collapseView}>
        <Image
          style={{height: 1314/3,width: 993/3,left:10}}
          source={require('../../assets/Chat_Session_Troop.png')} />
      </View>)
  }

  _renderView2 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent1.png')}
      />
      </View>
    )
  }
  _renderCollapseView2 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 303,width: 375,right:10}}
        source={require('../../assets/Chat_Session1.png')}
      />
      </View>
    )
  }

  _renderView3 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent2.png')}
      />
      </View>
    )
  }
  _renderCollapseView3 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 831/3,width: 993/3,left:10}}
        source={require('../../assets/Chat_Session2.png')}
      />
      </View>
    )
  }

  _renderView4 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent3.png')}
      />
      </View>
    )
  }
  _renderCollapseView4 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 303,width: 375,right:10}}
        source={require('../../assets/Chat_Session1.png')}
      />
      </View>
    )
  }

  _renderView5 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent4.png')}
      />
      </View>
    )
  }
  _renderCollapseView5 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 831/3,width: 993/3,left:10}}
        source={require('../../assets/Chat_Session2.png')}
      />
      </View>
    )
  }

  _renderView6 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent5.png')}
      />
      </View>
    )
  }
  _renderCollapseView6 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 303,width: 375,right:10}}
        source={require('../../assets/Chat_Session1.png')}
      />
      </View>
    )
  }

  _renderView7 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent6.png')}
      />
      </View>
    )
  }
  _renderCollapseView7 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 831/3,width: 993/3,left:10}}
        source={require('../../assets/Chat_Session2.png')}
      />
      </View>
    )
  }

  _renderView8 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent7.png')}
      />
      </View>
    )
  }
  _renderCollapseView8 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 303,width: 375,right:10}}
        source={require('../../assets/Chat_Session1.png')}
      />
      </View>
    )
  }

  _renderView9 = (collapse) => {
    return(
      <View style={s.view}>
      <Image
        style={{height: 156/3,width: 1059/3}}
        source={require('../../assets/Chat_ConvoComponent8.png')}
      />
      </View>
    )
  }
  _renderCollapseView9 = (collapse) => {
    return(
      <View style={s.collapseView}>
      <Image
        style={{height: 303,width: 375,right:10}}
        source={require('../../assets/Chat_Session1.png')}
      />
      </View>
    )
  }

  render() {
    const config = {
      velocityThreshold: .4,
      directionalOffsetThreshold: 150
    };
    return (
      <GestureRecognizer config={config} >
        <LinearGradient colors={[color, color]} style={{ height: height, width:width}}>
          <TopMenu 
            navigation={this.props.navigation}
            menuTitle="who" iconPath={assetPaths.topMenu.connectIcon} />
          <ScrollView style={{ //Navigational Menu
            flex:1,
            flexDirection: 'column',
            position: 'absolute',
            top:100,
            zIndex: 0,
            bottom:0
            }}>
            <CollapseView renderView={this._renderView1} renderCollapseView={this._renderCollapseView1} />
            <CollapseView renderView={this._renderView2} renderCollapseView={this._renderCollapseView2} />
            <CollapseView renderView={this._renderView3} renderCollapseView={this._renderCollapseView3} />
            <CollapseView renderView={this._renderView4} renderCollapseView={this._renderCollapseView4} />
            <CollapseView renderView={this._renderView5} renderCollapseView={this._renderCollapseView3} />
            <CollapseView renderView={this._renderView6} renderCollapseView={this._renderCollapseView4} />
            <CollapseView renderView={this._renderView7} renderCollapseView={this._renderCollapseView5} />
            <CollapseView renderView={this._renderView8} renderCollapseView={this._renderCollapseView2} />
            <CollapseView renderView={this._renderView2} renderCollapseView={this._renderCollapseView2} />
            <CollapseView renderView={this._renderView3} renderCollapseView={this._renderCollapseView3} />
            <CollapseView renderView={this._renderView4} renderCollapseView={this._renderCollapseView4} />
          </ScrollView>
          <AvaBottomMenu currentSection={'connect'} contextIcon={true} navigation={this.props.navigation}/>
        </LinearGradient>
      </GestureRecognizer>);
  }
}

export default ChatScreen