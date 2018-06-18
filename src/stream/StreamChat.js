// @flow
import type { LiveStreamMessage, LiveStreamMessagesConnection } from '../types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { from, Subject } from 'rxjs';
import { delay, mergeMap, tap } from 'rxjs/operators';
import { getLiveStreamChat } from '../core/youtube';
import AppContext from '../context';
import MessageList from './MesssageList';

type Props = {
  liveChatId: string,
};

type State = {
  loading: boolean,
  messages: ?LiveStreamMessagesConnection,
};

const { Consumer } = AppContext;

class StreamChat extends PureComponent<Props, State> {
  state = {
    loading: true,
    messages: null,
  };

  subscription = null;

  componentDidMount() {
    getLiveStreamChat(this.props.token, this.props.liveChatId).then(result => {
      const subject$ = new Subject();

      this.subscription = subject$
        .pipe(
          delay(result.pollingIntervalMillis),
          mergeMap(response =>
            from(
              getLiveStreamChat(
                this.props.token,
                this.props.liveChatId,
                response.nextPageToken,
              ).then(data => {
                subject$.next(data);
                return data;
              }),
            ),
          ),
          tap(data => {
            this.props.onRefresh(data);
          }),
        )
        .subscribe();

      subject$.next(result);
      this.props.onRefresh(result);
    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return (
      <Consumer>
        {({ messages }) =>
          messages.loading ? (
            <View style={{ height: 300 }} />
          ) : (
            <MessageList messages={messages.items} />
          )
        }
      </Consumer>
    );
  }
}

export default StreamChat;
