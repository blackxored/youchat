import glamorous from 'glamorous-native';
import {
  width,
  space,
  color,
  fontSize,
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  alignSelf,
  borderRadius,
  borderColor,
  borderWidth,
  letterSpacing,
  fontWeight,
} from 'styled-system';

const View = glamorous.view(
  width,
  space,
  color,
  fontSize,
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  alignSelf,
  borderRadius,
  borderColor,
  borderWidth,
  letterSpacing,
  fontWeight,
);

if (__DEV__) {
  View.displayName = 'View';
}

export default View;
