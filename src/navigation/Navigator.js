// @flow
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LoginScreen from '../auth/LoginScreen';
import StreamScreen from '../stream/StreamScreen';
import FocusScreen from '../focus/FocusScreen';

export default createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: createMaterialTopTabNavigator({
      Stream: StreamScreen,
      Focus: FocusScreen,
    }),
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
