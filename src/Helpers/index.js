import { Dimensions, Platform } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const wrapTheSentence = (sentence = '', limit = 3) => {
  return sentence?.split(' ')?.length > limit
    ? sentence?.split(' ').splice(0, limit).join(' ') + '...'
    : sentence;
};

export const isSmallDevice = (fontSize, smallFontSize) => {
  return DEVICE_WIDTH < 400 ? smallFontSize || fontSize - 2 : fontSize;
};

export const isIos = (ios, android) => {
  return Platform.OS === 'ios' ? ios : android;
};

export const isIphoneX = () => {
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize() || isIPhoneXrSize())
  );
};

export const isIPhoneXSize = () => {
  return DEVICE_HEIGHT == 812 || DEVICE_WIDTH == 812;
};

export const isIPhoneXrSize = () => {
  return DEVICE_HEIGHT == 896 || DEVICE_WIDTH == 896;
};

// const HEADER_SIZE = isIphoneX() ? 130 : 100;
