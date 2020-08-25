// @ts-nocheck
/* eslint-disable no-undef */
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default VideoDetails = ({ item, index, shareImageUrl }) => {
  console.log('TCL:: defaultVideoDetails -> item', item);
  return (
    <View style={styles.videoDetails}>
      <View>
        <Text style={styles.new}>New</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.thumbnail_url?.split('images/')[1].split('.')[0]}
        </Text>
      </View>
      <View>
        <Text style={styles.description}>2hr ago</Text>
        <TouchableOpacity
          style={styles.shareIcon}
          onPress={() => shareImageUrl(item)}>
          <FontAwesome5 name={'share-alt'} size={20} color={'#999'} />
        </TouchableOpacity>
      </View>
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
  shareIcon: {
    padding: 20,
  },
});
