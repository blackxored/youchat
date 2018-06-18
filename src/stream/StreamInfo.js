// @flow
import type { Thumbnail } from '../types';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box } from '../components';

type Props = {
  title: string,
  viewerCount: number,
  thumb: Thumbnail,
  hype: string,
};

const StreamInfo = ({ title, viewerCount, thumb, hype }: Props) => (
  <Box
    flexDirection="row"
    align="center"
    justify="space-between"
    style={{
      padding: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: 'gray',
    }}
  >
    <Box flexDirection="row" align="center" justify="center">
      <Image
        source={{ uri: thumb.url }}
        style={{ width: 48, height: 48, marginRight: 5, borderRadius: 24 }}
      />
      <Text>{title}</Text>
    </Box>
    <Box align="flex-end" justify="center">
      <Box flexDirection="row" align="center">
        <Icon name="eye" size={24} style={{ marginRight: 5 }} />
        <Text>{Intl.NumberFormat().format(viewerCount)} watching now</Text>
      </Box>
      <Box flexDirection="row" align="center">
        <Icon name="chart-areaspline" size={24} style={{ marginRight: 5 }} />
        <Text>{hype} Hype-Index™</Text>
      </Box>
    </Box>
  </Box>
);

export default StreamInfo;
