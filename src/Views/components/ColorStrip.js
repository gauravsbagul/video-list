/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import { Input } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ColorBox from './ColorBox';
import * as helper from '../../Helpers';

const ColorStrip = (props) => {
  const { item, index, onPressColorBox, colorListLength } = props;

  let leftStripColor = item.selectedColorBoxIndex
    ? item.values[item.selectedColorBoxIndex]?.color
    : item.values[0]?.color;

  return (
    <View style={{ flexDirection: 'row', width: helper.DEVICE_WIDTH - 60 }}>
      <View
        style={[
          {
            borderTopWidth: index == 0 && 1,
            borderBottomWidth: index == colorListLength - 1 && 1,
          },
          styles.leftColorStripWrapper,
        ]}>
        <View
          style={[
            styles.leftSideSelectedColor,
            { backgroundColor: leftStripColor },
          ]}
        />
      </View>
      <View style={[styles.flatList]}>
        <View style={styles.colorTitleValueContainer}>
          <Text style={[styles.colorStripTitle, { marginLeft: 10 }]}>
            {item.name} <Text style={styles.unit}>{`(${item.unit})`}</Text>
          </Text>
          <View>
            <Input
              style={[styles.input, { color: item.inputBoxValue && '#008B8B' }]}
              value={item.inputBoxValue || '0'}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
        <View style={styles.flstListWrapper}>
          <FlatList
            style={[styles.flatList]}
            data={[...item.values]}
            horizontal
            keyExtractor={(i) => i?.color.toString()}
            renderItem={({ item: it, index: i }) => (
              <ColorBox
                it={it}
                i={i}
                item={item}
                index={index}
                onPressColorBox={onPressColorBox}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
export default ColorStrip;
const styles = StyleSheet.create({
  colorStripTitle: {
    fontWeight: 'bold',
    color: '#aaa',
    fontSize: 20,
  },
  flatList: {
    marginTop: 10,
  },
  flstListWrapper: {
    width: helper.DEVICE_WIDTH - 60,
  },
  colorTitleValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColorStripWrapper: {
    backgroundColor: '#fff',
    width: 30,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'flex-end',
  },
  leftSideSelectedColor: {
    height: 28,
    marginBottom: 20,
  },
  unit: {
    color: '#bbb',
    fontSize: 15,
  },
  input: {
    color: '#bbb',
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    width: 60,
    height: 35,
    marginRight: 10,
  },
  valueBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 50,
  },
});
