/* eslint-disable react/no-unused-state */
// @flow
import type { LiveStream, LiveStreamMessagesConnection, User } from './types';
import * as React from 'react';
import { ThemeProvider } from 'react-native-material-ui';
import Navigator from './navigation/Navigator';
import AppContext from './context';
import { Loader } from './components';
import theme from './themes/default';
import { getHype } from './core/youtube';
// $FlowFixMe$

const { Provider } = AppContext;

type State = {
  hydrated: boolean,
  contextState: {
    currentUser: ?User,
    token: ?string,
  },
};

class Root extends React.PureComponent<{}, State> {
  // eslint-disable-next-line react/sort-comp
  setCurrentToken = (token: string, cb: () => void) => {
    this.setState(
      prevState => ({ contextState: { ...prevState.contextState, token } }),
      typeof cb === 'function' ? cb : () => {},
    );
  };

  setMessages = (messages: LiveStreamMessagesConnection) => {
    this.setState(prevState => {
      const msgs = prevState.contextState.messages.items
        ? {
            ...prevState.contextState.messages,
            ...messages,
            items: [...messages.items, ...prevState.contextState.messages.items],
          }
        : {
            ...messages,
            loading: false,
            items: messages.items.reverse(),
          };

      const hype = prevState.contextState.messages
        ? getHype(msgs.items, prevState.contextState.messages.items)
        : 'Calculating';

      return {
        contextState: {
          ...prevState.contextState,
          messages: {
            loading: false,
            ...msgs,
          },
          liveStream: {
            ...prevState.contextState.liveStream,
            hype,
          }
        },
      };
    });
  };

  setLiveStream = (liveStream: LiveStream) => {
    this.setState(prevState => ({
      contextState: {
        ...prevState.contextState,
        liveStream: {
          loading: false,
          ...liveStream,
        },
      },
    }));
  };

  state = {
    hydrated: true,
    contextState: {
      currentUser: null,
      token: null,
      liveStream: {
        loading: true,
      },
      messages: {
        loading: true,
      },
      setCurrentToken: this.setCurrentToken,
      setLiveStream: this.setLiveStream,
      setMessages: this.setMessages,
    },
  };

  render() {
    return this.state.hydrated ? (
      <Provider value={this.state.contextState}>
        <ThemeProvider uiTheme={theme}>
          <Navigator />
        </ThemeProvider>
      </Provider>
    ) : (
      <Loader />
    );
  }
}

export default Root;
