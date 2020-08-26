/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
// In App.js in a new project

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Input } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { getColors, setColors } from '../Redux/actions/colorStrip';

const ColorStrip = (props) => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectShadeIndex, setelectedShadeIndex] = useState(null);
  const [error] = useState('');

  const onPressColorBox = (i, index, it) => {
    setelectedShadeIndex(index);
    setSelectedColorIndex(i);
    props.setColors(index, i, it);
  };

  useEffect(() => {
    props.getColors();
  }, []);

  useEffect(() => {
    console.log('ColorStrip -> props', props);
    if (props.navigation.isFocused()) {
      if (props.colors?.hasOwnProperty('getAllColors')) {
        if (
          !props.colors?.getAllColors?.error &&
          props.colors?.getAllColors?.response?.length
        ) {
          setColorList(props.colors?.getAllColors?.response);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          Alert.alert('', ' Something went wrong!', [
            {
              text: 'Ok',
              onPress: () => {
                props.getColors();
              },
            },
          ]);
        }
      }
    }

    return () => {};
  }, [props.colors, props, colorList]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nextWrapper}>
          <Text style={styles.next}>Next</Text>
        </View>
      </View>
      <Container style={styles.bodyContainer}>
        <Text style={styles.testStrip}>Test Strip</Text>
        {isLoading && !error ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={[...colorList]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.flatList}>
                <View style={styles.colorTitleValueContainer}>
                  <Text style={styles.colorStripTitle}>
                    {item.name}{' '}
                    <Text style={styles.unit}>{`(${item.unit})`}</Text>
                  </Text>
                  <View style={styles.valueBox}>
                    <Input style={styles.input} value={item.inputBoxValue} />
                  </View>
                </View>
                <FlatList
                  style={styles.flatList}
                  data={[...item.values]}
                  horizontal
                  keyExtractor={(i) => i.color.toString()}
                  renderItem={({ item: it, index: i }) => (
                    <Pressable
                      style={[styles.colorsStripContainer, {}]}
                      onPress={() => onPressColorBox(i, index, it)}>
                      <View
                        style={[
                          styles.colorBox,
                          styles.selelctedBox,
                          {
                            borderColor:
                              i == selectedColorIndex &&
                              selectShadeIndex == index
                                ? 'green'
                                : '#0000',
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
                  )}
                />
              </View>
            )}
          />
        )}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
  },
  nextWrapper: {
    backgroundColor: '#999',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  next: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  colorStripTitle: {
    fontWeight: 'bold',
    color: '#aaa',
    fontSize: 20,
  },
  flatList: {
    marginTop: 20,
  },
  testStrip: {
    color: 'rgb(45,91,142)',
    fontWeight: 'bold',
    fontSize: 40,
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
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
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
  colorsStripContainer: {
    marginStart: 5,
    alignItems: 'center',
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

const mapStateToProps = ({ colors }) => {
  return {
    colors,
  };
};
const mapDispatchToProps = {
  getColors,
  setColors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorStrip);
