/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
// In App.js in a new project

import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getColors, setColors } from '../Redux/actions/colorStrip';
import ColorStrip from './components/ColorStrip';
import CustomAlert from './components/CustomAlert';
import * as helper from '../Helpers';

const ColorScreen = (props) => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleColorModal, setIsVisibleColorModal] = useState(false);
  const [error] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const onPressColorBox = (i, index, it) => {
    props.setColors(index, i, it);
  };

  useEffect(() => {
    props.getColors();
  }, []);

  useEffect(() => {
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
          Alert.alert('', 'Something went wrong!', [
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

  const onCloseModal = () => {
    setIsVisibleColorModal(false);
  };

  const showSelectedColorsDetails = async () => {
    let selectedColorsFiltred = colorList.filter((color) => {
      return color.hasOwnProperty('selectedColorBoxIndex');
    });
    if (selectedColorsFiltred.length) {
      setSelectedColors([...selectedColorsFiltred]);
      setIsVisibleColorModal(true);
    } else {
      Alert.alert('', 'Please Select the color first', [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        isVisibleColorModal={isVisibleColorModal}
        onCloseModal={onCloseModal}
        selectedColors={selectedColors}
      />
      <View style={styles.header}>
        <Pressable
          style={styles.nextWrapper}
          onPress={() => showSelectedColorsDetails()}>
          <Text style={styles.next}>Next</Text>
        </Pressable>
      </View>
      <Container style={styles.bodyContainer}>
        <Text style={styles.testStrip}>Test Strip</Text>

        <FlatList
          data={[...colorList]}
          ListEmptyComponent={<ActivityIndicator />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ColorStrip
              index={index}
              item={item}
              onPressColorBox={onPressColorBox}
              colorListLength={colorList.length}
            />
          )}
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: helper.isSmallDevice(20, 0),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: helper.isSmallDevice(60, 60),
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
    marginTop: helper.isSmallDevice(-10, 0),
    paddingHorizontal: 20,
  },
  testStrip: {
    color: 'rgb(45,91,142)',
    fontWeight: 'bold',
    fontSize: 40,
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorScreen);
