// @flow
import * as React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.Node,
};

class Screen extends React.PureComponent<Props> {
  render() {
    return <View style={{ flex: 1 }}>{this.props.children}</View>;
  }
}

export default Screen;
