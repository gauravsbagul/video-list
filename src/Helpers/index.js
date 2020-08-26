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
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

export const isIPhoneXSize = (dim) => {
  return dim.height == 812 || dim.width == 812;
};

export const isIPhoneXrSize = (dim) => {
  return dim.height == 896 || dim.width == 896;
};

// const HEADER_SIZE = isIphoneX() ? 130 : 100;
