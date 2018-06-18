// @flow
import type { LiveStreamMessage } from '../types';
import React from 'react';
import { FlatList } from 'react-native';
import { prop } from 'ramda';
import StreamChatMessage from './StreamChatMessage';

type Props = {
  messages: Array<LiveStreamMessage>,
};

const keyExtractor = prop('id');

const renderMessage = isFocusedChat => ({ item }: { item: LiveStreamMessage }) => {
  const {
    id,
    authorDetails,
    snippet: { publishedAt, textMessageDetails },
  } = item;

  return (
    <StreamChatMessage
      id={id}
      text={textMessageDetails.messageText}
      authorDisplayName={authorDetails.displayName}
      authorAvatar={authorDetails.profileImageUrl}
      isAuthorMod={authorDetails.isChatModerator}
      isAuthorOwner={authorDetails.isChatOwner}
      publishedAt={publishedAt}
      isFocusedChat={isFocusedChat}
    />
  );
};

const MessageList = ({ messages, isFocusedChat = false }: Props) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderMessage(isFocusedChat)}
      inverted
    />
  );
};

export default MessageList;
