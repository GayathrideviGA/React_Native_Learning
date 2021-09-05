import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainContainer from '../Containers/MainContainer/MainContainer';

const navigatorConfig = {
  initialRouteName: 'Todo',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
};

const mainNavigator = createStackNavigator(
  {
    Todo: {
      screen: MainContainer,
    },
  },
  navigatorConfig,
);

const AppNavigator = createAppContainer(mainNavigator);

export default AppNavigator;
