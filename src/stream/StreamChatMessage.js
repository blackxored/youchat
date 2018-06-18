// @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'glamorous-native';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import AppContext from '../context';

const { Consumer } = AppContext;

type Props = {
  id: string,
  text: string,
  authorDisplayName: string,
  authorAvatar: string,
  isAuthorMod: boolean,
  isAuthorOwner: boolean,
  isFocusedChat?: boolean,
  navigation: any, // TODO
  publishedAt: string,
};

class StreamChatMessage extends PureComponent<Props> {
  renderAuthorName() {
    const { authorDisplayName, isFocusedChat = false } = this.props;

    const authorName = (
      <Text fontWeight="bold" marginRight={5}>
        {authorDisplayName}
      </Text>
    );

    const navigate = () => this.props.navigation.navigate('Focus', { username: authorDisplayName });

    if (!isFocusedChat) {
      return <TouchableOpacity onPress={navigate}>{authorName}</TouchableOpacity>;
    }
    return authorName;
  }

  renderTimestamp() {
    const timestamp = moment(this.props.publishedAt).calendar()

    return (
      <Text style={{marginLeft: 10}}>{timestamp}</Text>
    );
  };

  render() {
    const { id, text, authorDisplayName, authorAvatar, isAuthorMod, isAuthorOwner, isFocusedChat } = this.props;

    // eslint-disable-next-line no-nested-ternary
    const userIcon = isAuthorMod ? 'account-star' : isAuthorOwner ? 'crown' : null;

    return (
      <View flexDirection="row" padding={10} alignItems="center" flexWrap="wrap">
        {userIcon ? (
          <Icon name={userIcon} size={24} />
        ) : (
          <Image
            source={{ uri: authorAvatar }}
            style={{ width: 24, height: 24, borderRadius: 12, marginRight: 5 }}
          />
        )}
        {this.renderAuthorName()}
        <Text flex={1} flexWrap="wrap" alignSelf="center">
          {text}
        </Text>
        {isFocusedChat && (
          <View>
            {this.renderTimestamp()}
          </View>
        )}
      </View>
    );
  }
}

export default withNavigation(StreamChatMessage);
