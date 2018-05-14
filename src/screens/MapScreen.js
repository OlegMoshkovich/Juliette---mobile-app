import React from 'react';
import Dimensions from 'Dimensions';
import { Animated,Platform,StyleSheet, Text, View, TouchableOpacity,Image, TouchableHighlight,ScrollView,Toggle, Button, ActivityIndicator, Alert} from 'react-native';
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {StackNavigator,TabNavigator, TabBarBottom} from 'react-navigation';
import { LinearGradient ,Constants, MapView, Location, Permissions } from 'expo';
import Swiper from 'react-native-swiper';
import CalendarScreen from './CalendarScreen.js';
import ChatScreen from './ChatScreen.js';
import PlaygroundScreen from './PlaygroundScreen.js';

const RandomNumber = Math.floor(Math.random() * 100) + 1
const {width, height} = Dimensions.get('window');
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
const Images = [
  { uri: "../../assets/Avatar_1.png" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]
const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = CARD_HEIGHT - 42;

class MapScreen extends React.Component {

  state = {
    moveAnim     : new Animated.Value(0),
    activated    : true,
    fadeAnim     : new Animated.Value(0),
    blurRadius   : 0,
    location: {coords: { latitude: 40.750859, longitude: -73.983324}},

    markers: [
      {
        coordinate: {
          latitude: 40.74,
          longitude: -74,
        },
        title: "Nicole Clark",
        description: "",
        image: require('../../assets/Avatar_1.png'),
      },

      {
        coordinate: {
          latitude: 40.731,
          longitude: -73.985428,
        },
        title: "Emma Brownstein",
        description: "",
        image: require('../../assets/Avatar_3.png'),
      },
      {
        coordinate: {
          latitude: 40.785091,
          longitude: -73.968285,
        },
        title: "Chloe Miller",
        description: "",
        image: require('../../assets/Avatar_4.png'),
      },
      {
        coordinate: {
          latitude: 40.74,
          longitude: -74,
        },
        title: "Nicole Clark",
        description: "",
        image: require('../../assets/Avatar_1.png'),
      },

      {
        coordinate: {
          latitude: 40.731,
          longitude: -73.985428,
        },
        title: "Emma Brownstein",
        description: "",
        image: require('../../assets/Avatar_3.png'),
      },
      {
        coordinate: {
          latitude: 40.785091,
          longitude: -73.968285,
        },
        title: "Chloe Miller",
        description: "",
        image: require('../../assets/Avatar_4.png'),
      },

    ],

    region: {
      latitude: 40.742,
      longitude: -74.01,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    },
  };
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
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {

      let index = Math.floor(value / CARD_WIDTH+3)  ; // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);

      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  _onPressButton=()=>{
    console.log("Button is pressed")
    this.setState({
    region: { latitude: 	this.state.location.coords.latitude, longitude: 	this.state.location.coords.longitude, latitudeDelta: 0.0222, longitudeDelta: 0.0221 }
    })
    }
  onRegionChangeComplete = (region) => {
    console.log(region);
    this.setState({region});
  }
  viewStyle() {
    return {
      flex: 1,

    }
  }
  render() {
    const interpolations = this.state.markers.map((marker, index) => {

      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];

      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });

      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });

      return { scale, opacity };
    });

    return (
      <LinearGradient
       colors={['#b98031', 'white', 'white']}
       style={{ height: height, width:width, flex:1}}>


    <Text style ={{color:"white",fontSize: 40,fontFamily: 'Helvetica', fontWeight:'bold', margin:15,top:20, marginBottom:40}}>where</Text>



    <TouchableOpacity style ={{margin:5,position:'absolute', top:42, right:90}}
        onPress={() => this.props.navigation.navigate({
          routeName: 'CommunicationDashboard',
              params: {
                  transition: 'default'
              }
            }
        )}>
        <Image
          style={{height: 30,width: 30}}
          source={require('../../assets/Dashboard-icon.png')}
        />
    </TouchableOpacity>

    <TouchableOpacity  style ={{margin:5,position:'absolute',  top:42, right:50}}
      onPress={() => this.props.navigation.navigate({
        routeName: 'CommunicationChat',
            params: {
                transition: 'default'
            }
          }
      )}>
      <Image
        style={{height: 30,width: 30}}
        source={require('../../assets/Chat-icon.png')}
      />
    </TouchableOpacity>

    <TouchableOpacity  style ={{margin:5,position:'absolute',  top:42, right:10}}
      onPress={() => this.props.navigation.navigate({
        routeName: 'CommunicationCalendar',
            params: {
                transition: 'default'
            }
          }
        )}>
        <Image
          style={{height: 30,width: 30}}
          source={require('../../assets/Calendar-icon.png')}
        />
    </TouchableOpacity>





      <View style={styles.container}>
      <MapView
        ref={map => this.map = map}
        initialRegion={this.state.region}
        style={styles.container}
        showsCompass={false}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <Image
                    style={styles.marker}
                    source={marker.image}
                  />
                </Animated.View>
              </MapView.Marker>
            );
            })}
      </MapView>

      <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH-30}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
      </Animated.ScrollView>

      </View>

      <View style={{ //Navigational Menu
        flex:1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: this.state.activated ? -50: 30,
        left:20
        }}>
          <TouchableOpacity style ={{margin:5}}  onPress={() => this.props.navigation.navigate('CommunicationMap')}>
          <Image
            style={{height: 35,width: 35}}
            source={require('../../assets/icons/Home_Icon_Communication.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Map')}>
          <Image
            style={{height: 35,width: 35}}
            source={require('../../assets/icons/Home_Icon_Community.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Community')}>
          <Image
            style={{height: 35,width: 35}}
            source={require('../../assets/icons/Home_Icon_System.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Calendar')} >
          <Image
            style={{height: 35,width: 35}}
            source={require('../../assets/icons/Home_Icon_Explore.png')}
          />
          </TouchableOpacity>
          <TouchableOpacity style ={{margin:5}} onPress={() => this.props.navigation.navigate('Shop')} >
          <Image
            style={{height: 35,width: 35}}
            source={require('../../assets/icons/Home_Icon_Dashboard.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    position: "absolute",
    top:30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
  },
  card: {
    padding: 0,
    elevation: 2,
    backgroundColor: "transparent",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT/1.5,
    width: CARD_WIDTH/1.5,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    color:'white',
    backgroundColor:'#56CCF2'
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 30,
    height: 30,

  },
  ring: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: "transparent",
    position: "absolute",
    borderWidth: 1,
    borderColor: "red",
  },
});



export default MapScreen;
