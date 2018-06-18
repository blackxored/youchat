// @flow
import { composeP } from 'ramda';
import { GoogleSignin } from 'react-native-google-signin';
import { getTokenFromAuthResponse } from '../core/youtube';

const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.force-ssl',
];

const checkGooglePlayServices = () => GoogleSignin.hasPlayServices({ autoResolve: true });

const configureAuth = () => GoogleSignin.configure({ scopes });

const signIn = () => GoogleSignin.signIn();

const signInWithGoogle = composeP(
  getTokenFromAuthResponse,
  signIn,
  configureAuth,
  checkGooglePlayServices,
);

export default signInWithGoogle;
