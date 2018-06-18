// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Stream from './Stream';
import { getTopLiveStream } from '../core/youtube';
import AppContext from '../context';

type Props = {
  // TODO: navigationProps
};

const { Consumer } = AppContext;

export class StreamScreen extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Stream',
  };

  render() {
    return (
      <Screen>
        <Consumer>
          {({ token, setMessages, setLiveStream }) => (
            <Stream
              token={token}
              onLiveStreamFetched={setLiveStream}
              onMessagesFetched={setMessages}
            />
          )}
        </Consumer>
      </Screen>
    );
  }
}

export default StreamScreen;
