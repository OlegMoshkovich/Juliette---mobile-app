import React from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Text, TouchableOpacity,TouchableWithoutFeedback,Image, TouchableHighlight,Toggle, Alert,
Platform, View, StatusBar, SafeAreaView} from 'react-native';
import Deck from '../Deck';
import { StackNavigator,TabNavigator, TabBarBottom } from 'react-navigation';
import { LinearGradient } from "expo";
import { Card, Button,Icon } from 'react-native-elements';
import { USE_NATIVE_DRIVER } from '../TestComponents/config';
import { Constants } from 'expo';
import Carousel from 'react-native-snap-carousel'; // 3.4.0
import AvaBottomMenu from '../components/AvaBottomMenu';
import TopMenu from '../components/TopMenu';
import NavMenu from '../components/NavMenu';
import assetPaths from '../assetPaths';
const {width, height} = Dimensions.get('window');

// global styles
import t from '../styles/shopscreen.js';

import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import s from '../styles/explorescreen.js';
import articles from '../../data/articles/articleContent.js';

class ExploreScreen extends React.Component {
      constructor (props) {
          super(props);
       }

       _renderItem ({item}) {
         const { width, height } = Dimensions.get('window');
         const itemWidth = width - 100;
             return (
                 <View style={[styles.slide, { width: itemWidth, height:400}]}>
                     <Text style={styles.title}>{ item.title }</Text>
                 </View>
             );
         }

       renderCard = ({item}) => {
         return(
           <TouchableWithoutFeedback
             onPress={() => {this.props.navigation.navigate('ArticleModal',
             {text: item.text, title: item.title, image_uri: item.uri}) }}>
             <Card key={item.id} containerStyle ={[s.cardContainer, { position: 'absolute', width:width-70}]}>
             <Text style ={s.cardSource}>{item.source} </Text>
             <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Badges'); }}>
             <Image style={s.cardBadge} resizeMode="cover" source={require('../../assets/Badge_WomenHealth.png')} />
             </TouchableWithoutFeedback>
             <Text style ={s.articleTitle}>{item.title} </Text>
             <Text style ={s.articleText}>{item.text}</Text>
             <Image style={s.articleCover} resizeMode="cover" source={{ uri:item.uri }} />
           </Card>
          </TouchableWithoutFeedback>
         )
       }



      render () {
        const { width, height } = Dimensions.get('window');
        return (
          <LinearGradient colors={['#00C5F0', '#50EAFF']} style={{ height: height, width:width} }>
            <TopMenu navigation={this.props.navigation} menuTitle="explore" iconPath={assetPaths.topMenu.exploreIcon} />
            <View style={{ flex: 5}}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={articles}
                renderItem={this.renderCard}
                sliderWidth={width}
                itemWidth={width - 70}
                itemHeight={height}
              />
            </View>
            <AvaBottomMenu showTab={true}  tabTitle={"Related"} currentSection={'explore'} contextIcon={true} navigation={this.props.navigation}/>
          </LinearGradient>
  );


      }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
    slide: {
      height: 100,
      backgroundColor: 'lightgrey',
    },
  });
export default ExploreScreen;
