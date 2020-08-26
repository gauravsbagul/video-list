/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import { Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as helper from '../../Helpers';
import ColorBox from './ColorBox';

const ColorStrip = (props) => {
  const [inpurValue, setInpurValue] = useState('');
  const {
    item,
    index,
    onPressColorBox,
    colorListLength,
    onChangeColorValue,
  } = props;

  useEffect(() => {
    setInpurValue(item.inputBoxValue);
  }, [item.inputBoxValue]);

  const handleValueChange = (newValue) => {
    if (item.inputBoxValue !== undefined) {
      setInpurValue(newValue);
      onChangeColorValue(newValue, index, item.inputBoxValue);
    } else {
      setInpurValue('');
      Alert.alert('', 'Please Select the color first', [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  let leftStripColor = item.selectedColorBoxIndex
    ? item.values[item.selectedColorBoxIndex]?.color
    : item.values[0]?.color;

  return (
    <View style={{ flexDirection: 'row', width: helper.DEVICE_WIDTH - 60 }}>
      <View
        style={[
          {
            borderTopWidth: index == 0 ? 1 : 0,
            borderBottomWidth: index == colorListLength - 1 ? 1 : 0,
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
              style={[
                styles.input,
                { color: item.inputBoxValue ? '#008B8B' : '#000' },
              ]}
              value={inpurValue}
              keyboardType={'number-pad'}
              onChangeText={(newValue) => handleValueChange(newValue)}
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
