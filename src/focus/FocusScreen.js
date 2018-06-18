// @flow
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { path, pathEq, filter } from 'ramda';
import { Box, Screen } from '../components';
import AppContext from '../context';
import MessageList from '../stream/MesssageList';

const { Consumer } = AppContext;

type Props = {
  // TODO: navigation
};

const isFromUser = username => pathEq(['authorDetails', 'displayName'], username);
const filterMessages = (username, messages) => filter(isFromUser(username), messages.items);

export class FocusScreen extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Focus',
  };

  renderFocusedChat(username: string) {
    return (
      <Consumer>
        {({ messages }) => (
          <MessageList isFocusedChat messages={filterMessages(username, messages)} />
        )}
      </Consumer>
    );
  }

  renderHint() {
    return (
      <Box flex={1} align="center" justify="center" padding={40}>
        <Text style={{ fontSize: 20 }}>
          Tap a username from the live chat to focus on their messages
        </Text>
      </Box>
    );
  }
  render() {
    const username = path(['navigation', 'state', 'params', 'username'], this.props);

    return <Screen>{username ? this.renderFocusedChat(username) : this.renderHint()}</Screen>;
  }
}

export default FocusScreen;
