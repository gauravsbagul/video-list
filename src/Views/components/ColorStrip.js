/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import { Input } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ColorBox from './ColorBox';

const ColorStrip = (props) => {
  const { item, index, onPressColorBox } = props;

  return (
    <View style={styles.flatList}>
      <View style={styles.colorTitleValueContainer}>
        <Text style={styles.colorStripTitle}>
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
      <FlatList
        style={styles.flatList}
        data={[...item.values]}
        horizontal
        keyExtractor={(i) => i.color.toString()}
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
  colorTitleValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 50,
    height: 30,
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
