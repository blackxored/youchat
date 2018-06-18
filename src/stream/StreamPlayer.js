// @flow
import React from 'react';
import Youtube from 'react-native-youtube';
import config from '../core/config';

type Props = {
  videoId: string,
};

const StreamPlayer = ({ videoId }: Props) => (
  <Youtube
    videoId={videoId}
    apiKey={config.youtube.apiKey}
    style={{ alignSelf: 'stretch', height: 300 }}
  />
);

export default StreamPlayer;
