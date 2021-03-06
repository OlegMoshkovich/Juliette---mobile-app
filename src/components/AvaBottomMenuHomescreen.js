import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import { View, TouchableOpacity,Image, Animated} from 'react-native';
import s from '../styles/avabottommenuhomescreen';
import assetPaths from '../assetPaths'
const {width} = Dimensions.get('window');

// ava bottom menu specific configuration
const animationDuration = 1000;
const initialBlurRadius = 0;
const maxBlurRadius = 10;
const avaLocationBottom_inactive = -35;
const avaLocationBottom_active = -112;
const avaHeight = 150;
const gradientBottom_active = -200;
const gradientBottom_inactive = 0;
const navMenu_active = -200;
const navMenu_inactive = 50;


class AvaBottomMenuHomescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activated: false,
            moveAnim: new Animated.Value(0),
            fadeAnim: new Animated.Value(0),
            blurRadius: initialBlurRadius
        };
    }
    animate = () => {
        if (this.state.blurRadius == maxBlurRadius) { this.setState({ blurRadius: initialBlurRadius });
        } else { this.setState({ blurRadius: maxBlurRadius }); }

        Animated.timing( this.state.fadeAnim, { toValue: this.state.activated ? 1: 0, duration: animationDuration, }).start();
        this.setState({activated : !this.state.activated});
    }

    render() {
        return (<View>
            <TouchableOpacity
                style = {{
                    alignSelf: 'flex-end', position: 'absolute', right: 5, zIndex: 1,
                    bottom: this.state.activated ? avaLocationBottom_active : avaLocationBottom_inactive,
                    height: avaHeight}}
                onPress={this.animate} onLongPress={this.animate}>
            </TouchableOpacity>
            <Image
                style={[s.gradientStyle, { width: width, bottom: this.state.activated ? gradientBottom_active: gradientBottom_inactive}]}
                source={assetPaths.bottomMenu.homeScreen.gradient} />
            <View style={[s.navStyle, { bottom: this.state.activated ? navMenu_active: navMenu_inactive,}]}>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Connect')}>
                    <Image style={s.navIconImage} source={assetPaths.bottomMenu.homeScreen.connectIcon} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Community')}>
                    <Image style={s.navIconImage} source={assetPaths.bottomMenu.homeScreen.communityIcon} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')}>
                    <Image style={s.navIconImage} source={assetPaths.bottomMenu.homeScreen.homeIcon} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Explore')} >
                    <Image style={s.navIconImage} source={assetPaths.bottomMenu.homeScreen.exploreIcon} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Dashboard')} >
                    <Image style={s.navIconImage} source={assetPaths.bottomMenu.homeScreen.dashboardIcon} />
                </TouchableOpacity>
            </View>
        </View>);
    }
}

export default AvaBottomMenuHomescreen
