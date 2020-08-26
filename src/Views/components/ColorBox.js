/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */

import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

const ColorsBox = (props) => {
  const { i, index, item, it, onPressColorBox } = props;
  return (
    <Pressable
      style={[styles.colorsStripContainer, {}]}
      onPress={() => onPressColorBox(i, index, it)}>
      <View
        style={[
          styles.colorBox,
          styles.selelctedBox,
          {
            borderColor: i == item.selectedColorBoxIndex ? 'green' : '#0000',
          },
        ]}>
        <View
          style={[
            styles.colorBox,
            {
              backgroundColor: it.color,
            },
          ]}
        />
      </View>
      <Text style={styles.input}>{it.value}</Text>
    </Pressable>
  );
};
export default ColorsBox;
const styles = StyleSheet.create({
  colorsStripContainer: {
    marginStart: 5,
    alignItems: 'center',
  },
  input: {
    color: '#bbb',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  selelctedBox: {
    borderWidth: 2,
    padding: 3,
    backgroundColor: '#0000',
    height: 35,
    width: 65,
    borderRadius: 5,
  },
  colorBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 58,
  },
});
