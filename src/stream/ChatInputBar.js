// @flow
import React, { PureComponent } from 'react';
import { View } from 'glamorous-native';
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onSendMessage: (message: string) => void,
};

type State = {
  message: string,
};

class ChatInputBar extends PureComponent<Props, State> {
  state = {
    message: '',
  };

  handleSendMessage = () => {
    this.props.onSendMessage(this.state.message);
    this.setState({ message: '' });
  };

  handleChange = (value: string) => {
    console.log(value);
    this.setState({ message: value });
  };

  render() {
    return (
      <View
        flexDirection="row"
        padding={2}
        alignSelf="flex-end"
        alignItems="center"
        background="rgba(238, 238, 238, 0.4)"
        borderTopWith={StyleSheet.hairlineWidth}
        borderColor="#000"
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder="Say something in chat..."
          value={this.state.message}
          onChangeText={this.handleChange}
          onSubmitEditing={this.handleSendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={{ marginTop: 10, paddingHorizontal: 5 }}
          onPress={this.handleSendMessage}
        >
          <Icon name="send" size={24} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChatInputBar;
