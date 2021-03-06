import React from 'react';
import Dimensions from 'Dimensions';
import { View, TouchableOpacity,Image,ScrollView} from 'react-native';
const {width} = Dimensions.get('window');
import s from '../styles/articlemodal';
import assetPaths from '../assetPaths';

class ArticleModalScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			friendRequested: false,
		};
	}

	renderStoryPng(id) {
		switch (id) {
			case 1:
				return (<Image style={{width: 375, height: 3810, marginBottom: 100}} source={require('../../assets/staticScreens/articles/Article_01.png')} />);
				break;
			case 2:
				return (<Image style={{width: 375, height: 2838, marginBottom: 100}} source={require('../../assets/staticScreens/articles/Article_02.png')} />);
				break;
			case 3:
				return (<Image style={{width: 375, height: 3698, marginBottom: 100}} source={require('../../assets/staticScreens/articles/Article_03.png')} />);
				break;
			case 4:
				return (<Image style={{width: 375, height: 3520, marginBottom: 100}} source={require('../../assets/staticScreens/articles/Article_04.png')} />);
				break;
			case 5:
				return (<Image style={{width: 375, height: 3520, marginBottom: 100}} source={require('../../assets/staticScreens/articles/Article_04.png')} />);
				break;
		}
	}

  render() {
		const {params} = this.props.navigation.state;
		const id = params ? params.id: 1;
		return (
			
		<View style={s.modalContainer}>
			<View style={[s.modalMenuContainer, {width: width}]}>
				<TouchableOpacity style={s.modalButton} >
					<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.share} />
				</TouchableOpacity>
				<TouchableOpacity style={s.modalButton} >
					<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.star} />
				</TouchableOpacity>
				<TouchableOpacity style={s.modalButton} >
					<Image style={s.modalIconImage} source={assetPaths.modals.shareModal.like} />
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

export default ArticleModalScreen
