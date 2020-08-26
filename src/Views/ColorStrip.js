// In App.js in a new project

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Container, Input } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
const COLOR_STRIPS = [
  {
    id: '1',
    name: 'Total Hardness',
    unit: 'ppm',
    values: [
      { color: 'rgb(45,91,142)', value: '0' },
      { color: 'rgb(89,100,146)', value: '110' },
      { color: 'rgb(97,88,138)', value: '250' },
      { color: 'rgb(118,75,119)', value: '500' },
      { color: 'rgb(152,81,130)', value: '1000' },
    ],
  },
  {
    id: '2',
    name: 'Total Chlorine',
    unit: 'ppm',
    values: [
      { color: 'rgb(255,240,108)', value: '0' },
      { color: 'rgb(245,248,127)', value: '1' },
      { color: 'rgb(223,235,111)', value: '3' },
      { color: 'rgb(166,203,158)', value: '5' },
      { color: 'rgb(134,192,154)', value: '10' },
    ],
  },
  {
    id: '3',
    name: 'Free Chlorine',
    unit: 'ppm',
    values: [
      { color: 'rgb(254,240,156)', value: '0' },
      { color: 'rgb(230,217,201)', value: '1' },
      { color: 'rgb(177,146,184)', value: '3' },
      { color: 'rgb(150,103,159)', value: '5' },
      { color: 'rgb(119,62,129)', value: '10' },
    ],
  },
  {
    id: '4',
    name: 'pH',
    unit: 'ppm',
    values: [
      { color: 'rgb(211,145,75)', value: '6.2' },
      { color: 'rgb(236,119,62)', value: '6.8' },
      { color: 'rgb(208,85,42)', value: '7.2' },
      { color: 'rgb(206,82,74)', value: '7.8' },
      { color: 'rgb(214,50,71)', value: '8.4' },
    ],
  },
  {
    id: '5',
    name: 'Total Alkalinity',
    unit: 'ppm',
    values: [
      { color: 'rgb(210,158,74)', value: '0' },
      { color: 'rgb(159,150,79)', value: '40' },
      { color: 'rgb(104,129,111)', value: '120' },
      { color: 'rgb(54,112,103)', value: '180' },
      { color: 'rgb(53,106,115)', value: '240' },
    ],
  },
  {
    id: '6',
    name: 'Cyanuric Acid',
    unit: 'ppm',
    values: [
      { color: 'rgb(197,137,68)', value: '0' },
      { color: 'rgb(191,104,46)', value: '50' },
      { color: 'rgb(175,69,77)', value: '100' },
      { color: 'rgb(144,39,92)', value: '150' },
      { color: 'rgb(132,46,119)', value: '300' },
    ],
  },
];
const ColorStrip = ({ navigation }) => {
  // const [state, setstate] = useState(initialState)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nextWrapper}>
          <Text style={styles.next}>Next</Text>
        </View>
      </View>
      <Container style={styles.bodyContainer}>
        <Text style={styles.testStrip}>Test Strip</Text>
        <FlatList
          data={[...COLOR_STRIPS]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.flatList}>
              <View style={styles.colorTitleValueContainer}>
                <Text style={styles.colorStripTitle}>
                  {item.name}{' '}
                  <Text style={styles.unit}>{`(${item.unit})`}</Text>
                </Text>
                <View style={styles.valueBox}>
                  <Input style={styles.input} value={item.values[0].value} />
                </View>
              </View>
              <FlatList
                // eslint-disable-next-line react-native/no-inline-styles
                style={styles.flatList}
                data={[...item.values]}
                horizontal
                keyExtractor={(i) => i.color.toString()}
                renderItem={({ item: it }) => (
                  <Pressable
                    style={styles.colorsStripContainer}
                    onPress={() => console.log(it)}>
                    <View
                      style={[styles.colorBox, { backgroundColor: it.color }]}
                    />
                    <Text style={styles.input}>{it.value}</Text>
                  </Pressable>
                )}
              />
            </View>
          )}
        />
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
    marginStart: 10,
    alignItems: 'center',
  },
  colorBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 60,
  },
});

export default ColorStrip;
