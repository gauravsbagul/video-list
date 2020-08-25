/* eslint-disable no-undef */
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default VideoDetails = ({ item, index }) => {
  return (
    <View style={styles.videoDetails}>
      <View>
        <Text style={styles.new}>New</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.thumbnail_url.split('images/')[1].split('.')[0]}
        </Text>
      </View>
      <Text style={styles.description}>2hr ago</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  videoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    height: 100,
    width: '100%',
    borderRadius: 15,
  },
  new: {
    color: '#008080',
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    fontSize: 15,
  },
});
