console.disableYellowBox = true;

import React from 'react';
import { Animated} from 'react-native';
import { Font } from 'expo';
import {StackNavigator,TabNavigator} from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ChatScreen from './src/screens/ChatScreen';
import CommsDashboardScreen from './src/screens/CommsDashboardScreen'
import ArticleModalScreen from './src/screens/ArticleModalScreen';
import ShopScreen from './src/screens/ShopScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import EventScreen from './src/screens/EventScreen';
import BadgeScreen from './src/screens/BadgeScreen';
import JourneyScreen from './src/screens/JourneyScreen';
import AwardScreen from './src/screens/AwardScreen';
import StoryModalScreen from './src/screens/StoryModalScreen';
import MicroBadgeModalScreen from './src/screens/MicroBadgeModalScreen';
import BadgeModalScreen from './src/screens/BadgeModalScreen';
import PostModalScreen from './src/screens/PostModalScreen';
import Dimensions from 'Dimensions';
import SystemScreen from './src/screens/SystemScreen';
import MicroBadgeScreen from './src/screens/MicroBadgeScreen';

const {height} = Dimensions.get('window');

let MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const opacity = position.interpolate({ inputRange, outputRange: [0, 1, 1],});
    return { opacity };
};

let TransitionConfiguration = () => {
    return {
      screenInterpolator: (sceneProps) => {
        const {position, scene} = sceneProps; const {index} = scene;
        return MyTransition(index, position);
      }
    }
};

const transitionConfig = () => {
  return {
    transitionSpec: { duration: 200, timing: Animated.timing, useNativeDriver: true},
    screenInterpolator: sceneProps => {
      const {position, scene} = sceneProps;
      const params = scene.route.params || {}
      const thisSceneIndex = scene.index
      let yVariable = height;
      if (params.hasOwnProperty("transition")) {
        if (params.transition == 'systemTransition') {
          const opacity = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex], outputRange: [0, 1], })
          return { opacity }
        } else {
          let translateY = position.interpolate({ inputRange: [thisSceneIndex-1,thisSceneIndex],
            outputRange: [ yVariable, 0], })
          return { transform: [ {translateY}] }
        }
      }
    }
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiping: true,
      connect:false}
  }

  componentDidMount() {
    Font.loadAsync({ 'trefoil-sans-black': require('./assets/fonts/TrefoilSans-Black.otf'), 'trefoil-sans-semibold': require('./assets/fonts/TrefoilSans-SemiBold.otf'), 'trefoil-sans-light':  require('./assets/fonts/TrefoilSans-Light.otf'), 'trefoil-sans-regular': require('./assets/fonts/TrefoilSans-Regular.otf'),});
  }

  render() {
    
    const ConnectStack = StackNavigator(
      {
        ConnectDashboard: { screen: CommsDashboardScreen, },
        Chat: { screen: ChatScreen, },
        Calendar: { screen: CalendarScreen, },
        Events: { screen: EventScreen, },
      },
      {
        headerMode: 'none', navigationOptions: { headerVisible: false, },
        transitionConfig: TransitionConfiguration,
      },
    );

    const EducationStack = StackNavigator(
      {
        Dashboard: { screen: DashboardScreen, },
        Badges: { screen: BadgeScreen, },
        MicroBadge: { screen: MicroBadgeScreen },
        Journey: { screen: JourneyScreen, },
        Award: { screen: AwardScreen, }, },
      { headerMode: 'none', navigationOptions: { headerVisible: false, },
        transitionConfig: TransitionConfiguration, },
    );

    const TabStack =  TabNavigator({
      Connect:{screen: ConnectStack},
      Community: { screen: CommunityScreen },
      Home: { screen: HomeScreen},
      Explore: { screen: ExploreScreen },
      Dashboard: { screen: EducationStack },
      },
      { swipeEnabled:this.state.swiping,
        initialRouteName:'Home',
        navigationOptions: { tabBarVisible: false },
      }
    );

    const RootStack = StackNavigator({
      Main: { screen: TabStack, },
      SystemModal: { screen: SystemScreen,},
      ShopModal: { screen: ShopScreen },
      ArticleModal: { screen: ArticleModalScreen, },
      StoryModal: { screen: StoryModalScreen, },
      MicroBadgeModal: { screen: MicroBadgeModalScreen },
      BadgeModal: { screen: BadgeModalScreen, },
      PostModal: { screen: PostModalScreen, }
      },
      { transitionConfig, mode: 'modal', headerMode: 'none', });

    TabStack.navigationOptions = ({ navigation }) => {
      let { routeName } = navigation.state.routes[navigation.state.index];
    }

    return (<RootStack  />);
  }
}

export default App
