// @flow
import React, { PureComponent } from 'react';
import { Text } from 'glamorous-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Box from '../components/Box';
import signInWithGoogle from './signInWithGoogle';
import { request, getSearchURL, getTopLiveStream } from '../core/youtube';
import AppContext from '../context';

type Props = {
  onNavigateToTopStream: () => void,
};

const { Consumer } = AppContext;

class Login extends PureComponent<Props> {
  signIn = setCurrentToken => async () => {
    const token = await signInWithGoogle();
    setCurrentToken(token, () => {
      this.props.onNavigateToTopStream();
    });
  };

  render() {
    return (
      <Box align="center" justify="center" flex={1}>
        <Box flex={1} align="center" justify="center">
          <Text fontSize={48}>YouChat</Text>
        </Box>
        <Consumer>
          {({ setCurrentToken }) => (
            <GoogleSigninButton
              onPress={this.signIn(setCurrentToken)}
              style={{ width: 200, height: 50, marginBottom: 30 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
            />
          )}
        </Consumer>
      </Box>
    );
  }
}

export default Login;
