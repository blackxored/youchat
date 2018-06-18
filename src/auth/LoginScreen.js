// @flow
import React, { PureComponent } from 'react';
import Login from './Login';

class LoginScreen extends PureComponent<{}> {
  static navigationOptions = {
    headerMode: 'none',
  };

  navigateToTopStream = () => {
    this.props.navigation.navigate('Stream');
  };

  render() {
    return <Login onNavigateToTopStream={this.navigateToTopStream} />;
  }
}

export default LoginScreen;
