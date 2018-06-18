/* eslint-disable react/sort-comp */
// @flow
import type { LiveStream, LiveStreamMessagesConnection } from '../types';
import React, { PureComponent } from 'react';
import { Box, Loader } from '../components';
import AppContext from '../context';
import { getHype, getLiveStreamChat, getTopLiveStream, sendMessage } from '../core/youtube';
import StreamPlayer from './StreamPlayer';
import StreamInfo from './StreamInfo';
import StreamChat from './StreamChat';
import ChatInputBar from './ChatInputBar';
import { KeyboardAvoidingView } from 'react-native';

type Props = {
  token: ?string,
};

type State = {
  loading: boolean,
  liveStream?: LiveStream,
  hype: string,
  onMessagesFetched: LiveStreamMessagesConnection => void,
};

const { Consumer } = AppContext;

class Stream extends PureComponent<Props, State> {
  state = { hype: 'Calculating' };

  componentDidMount() {
    if (this.props.token) {
      getTopLiveStream(this.props.token).then(liveStream => {
        this.props.onLiveStreamFetched(liveStream);
      });
    }
  }

  handleSendMessage = (activeLiveChatId: string) => (message: string) => {
    // TODO: sendMessage should triggger a refresh, but we had problems merging (i.e dupe keys)
    return sendMessage(
      this.props.token,
      activeLiveChatId,
      message,
    );
  };

  handleChatRefresh = messages => {

    this.props.onMessagesFetched(messages);
  };

  render() {
    return (
      <Consumer>
        {({ liveStream }) =>
          liveStream.loading ? (
            <Loader />
          ) : (
            <Box flex={1}>
              <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
                <StreamPlayer videoId={liveStream.id} />
              </KeyboardAvoidingView>
              <StreamInfo
                title={liveStream.snippet.channelTitle}
                thumb={liveStream.channelDetails.snippet.thumbnails.default}
                viewerCount={liveStream.liveStreamingDetails.concurrentViewers}
                hype={liveStream.hype}
              />
              <StreamChat
                token={this.props.token}
                liveChatId={liveStream.liveStreamingDetails.activeLiveChatId}
                onRefresh={this.handleChatRefresh}
              />
              <ChatInputBar
                onSendMessage={this.handleSendMessage(
                  liveStream.liveStreamingDetails.activeLiveChatId,
                )}
              />
            </Box>
          )
        }
      </Consumer>
    );
  }
}

export default Stream;
