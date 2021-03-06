import React from 'react';
import Dimensions from 'Dimensions';

import { View, Image, Animated} from 'react-native';
import { LinearGradient, MapView, Location, Permissions } from 'expo';
import AvaBottomMenu from '../components/AvaBottomMenu.js';
import TopMenu from '../components/TopMenu';
import assetPaths from '../assetPaths';
import s from '../styles/eventscreen';

// map specific data
import mapMarkers from '../../data/map/markers.js';
import mapMarkersFriends from '../../data/map/markersFriends.js';
import mapRegion from '../../data/map/region.js';
import mapLocation from '../../data/map/location.js';

const color = '#FFF2AD';
const CARD_WIDTH = 664 / 2;
const CARD_HEIGHT = 334 / 2;
const AVATAR_ICON = 80;
const {width, height} = Dimensions.get('window');


class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activated  : true,
      location   : mapLocation,
      markers    : mapMarkers,
      region     : mapRegion,
      showingFriends: false,
    };

    this.toggleMap = this.toggleMap.bind(this);
 }

 toggleMap() {
    if (this.state.showingFriends) {
      this.setState({
        markers: mapMarkers,
        showingFriends: false,
      })
    } else {
      this.setState({
        markers: mapMarkersFriends,
        showingFriends: true,
      })
    }
 }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index;
      if (this.state.showingFriends) {
        index = Math.floor(value / AVATAR_ICON+0.5);
      } else {
        index = Math.floor(value / CARD_WIDTH+0.5)
      }
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) { index = 0; }
      
      clearTimeout(this.regionTimeout);
      
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            { ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },500);}}, 10);
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
    this.setState({
      region: { latitude: 	this.state.location.coords.latitude, longitude: 	this.state.location.coords.longitude, latitudeDelta: 0.0222, longitudeDelta: 0.0221 }
    })
    }
  
  onRegionChangeComplete = (region) => {
    this.setState({region});
  }
  
  renderMapView(interpolations) {
    return(
      <MapView
        ref={map => this.map = map}
        initialRegion={this.state.region}
        style={{height: height, width: width}}
        showsCompass={false}>
        {this.state.markers.map((marker, index) => {
          const scaleStyle = {transform: [{scale: interpolations[index].scale}]};
          const opacityStyle = {opacity: interpolations[index].opacity};
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate}>
              <Animated.View style={[s.markerWrap, opacityStyle]}>
                <Animated.View style={[s.ring, scaleStyle]} />
                <Image style={[s.marker, this.state.showingFriends ? s.markerFriend : null ]} source={marker.mapIcon} resizeMode="contain"/>
              </Animated.View>
            </MapView.Marker>);
        })}
      </MapView>);
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      let opacity, scale, inputRange;
      if (this.state.showingFriends == true) {
        inputRange = [(index - 1) * AVATAR_ICON,
          index * AVATAR_ICON, ((index + 1) * AVATAR_ICON)];
        scale = this.animation.interpolate({
          inputRange, outputRange: [1, 1.5, 1], extrapolate: "clamp"});
        opacity = this.animation.interpolate({
          inputRange, outputRange: [0.35, 1, 0.35], extrapolate: "clamp",});
      } else {
        inputRange = [(index - 1) * CARD_WIDTH,
          index * CARD_WIDTH, ((index + 1) * CARD_WIDTH)];
        scale = this.animation.interpolate({
          inputRange, outputRange: [1, 1.5, 1], extrapolate: "clamp"});
        opacity = this.animation.interpolate({
          inputRange, outputRange: [0.35, 1, 0.35], extrapolate: "clamp",});
      }
      return { scale, opacity };
    });

    return (
      <LinearGradient
        colors={[color, color]} style={{ height: height, width:width}}>
        <TopMenu navigation={this.props.navigation} menuTitle="what" iconPath={assetPaths.topMenu.connectIcon} />
          <View style={[s.container, {height: 330}]}>
            { this.renderMapView(interpolations) }
            <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={this.state.showingFriends ? AVATAR_ICON : CARD_WIDTH-30}
              onScroll={Animated.event([
                {nativeEvent: {contentOffset: {x: this.animation}}}], { useNativeDriver: true }
              )}
              style={s.scrollView}>{this.state.markers.map((marker, index) => (
                <View style={[s.card,
                  this.state.showingFriends ? {height: AVATAR_ICON, width: AVATAR_ICON} :
                    {height: CARD_HEIGHT, width: CARD_WIDTH,} ]} key={index}>
                  <Image source={marker.image} style={s.cardImage} resizeMode="cover" />
                </View>))}
            </Animated.ScrollView>
          </View>
        <AvaBottomMenu contextFunction={this.toggleMap} currentSection={'connect'} contextIcon={true} showTab={true} tabTitle={"All Events"} tabLeft={22} navigation={this.props.navigation}/>
      </LinearGradient>);
    }
}

export default EventScreen