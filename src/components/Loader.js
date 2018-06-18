// @flow
import React from 'react';
import Spinner from 'react-native-spinkit';
import Box from './Box';

const Loader = () => (
  <Box flex={1} align="center" justify="center">
    <Spinner type="Pulse" />
  </Box>
);

export default Loader;
