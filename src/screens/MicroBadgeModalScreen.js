import React from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Text, View, TouchableOpacity,Image, TouchableHighlight,ScrollView,Toggle, Alert, Animated} from 'react-native';
import {StackNavigator,TabNavigator, TabBarBottom} from 'react-navigation';
import {Card, Button,Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');


import s from '../styles/storymodal';
import assetPaths from '../assetPaths';
import storyContent from '../../data/stories/stories';



class MicroBadgeModalScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friendRequested: false,
			heartSolid: false,
			starSolid: false,

		};
		//console.log("story modal screen props", this.props);


	}

	addFriend() {

		if (this.state.friendRequested) {
			this.setState({
				friendRequested: false,
			});
		} else {
			this.setState({
				friendRequested: true,
			});
		}

	}

	renderStoryPng(id) {

		switch (id) {
			case 1:
				return (<Image style={{width: width, height: height, marginBottom: 100, top: -100}} source={require('../../assets/staticScreens/microbadges/MicroBadgeModaldScreen.png')} />);
				break;

		}
	}

  render() {

		const {params} = this.props.navigation.state;
		const id = params ? params.id: 1;
		console.log("rendering id", id);

    return (
		<View style={s.modalContainer}>

			<View style={[s.modalMenuContainer, {width: width}]}>
				<TouchableOpacity style={s.modalButton} >
					<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.share} />
				</TouchableOpacity>
				<TouchableOpacity style={s.modalButton} onPress={() => this.setState({starSolid: !this.state.starSolid})}>

					{ this.state.starSolid ?
						<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.starSolid} /> :
						<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.star} />
					}

				</TouchableOpacity>
				<TouchableOpacity style={s.modalButton} onPress={() => this.setState({heartSolid: !this.state.heartSolid})}>

					{ this.state.heartSolid ?
						<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.likeSolid} /> :
						<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.like} />
					}

				</TouchableOpacity>
				<TouchableOpacity style={s.exitButton} onPress={() => this.props.navigation.goBack()} >
					<Image style={s.exitIconImage} source={assetPaths.modals.shareModal.close}/>
				</TouchableOpacity>

		</View>
  		<ScrollView style={s.storyContentContainer}>
  			{ this.renderStoryPng(id)}
		</ScrollView>


</View>);
  }
}

export default MicroBadgeModalScreen;