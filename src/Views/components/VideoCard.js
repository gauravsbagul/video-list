/* eslint-disable no-undef */
import { Card, Text, View } from 'native-base';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default VideoCard = ({ item, index }) => {
  return (
    <Card style={styles.card}>
      <ImageBackground
        style={styles.thumbnail}
        resizeMode={'cover'}
        imageStyle={styles.thumbnailImage}
        source={{ uri: item.thumbnail_url }}>
        <Pressable
          style={styles.playButtonWrapper}
          onPress={() => console.log(item)}>
          <FontAwesome name={'play'} size={15} color={'#fff'} />
        </Pressable>
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
      </ImageBackground>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  thumbnail: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  thumbnailImage: {
    height: 300,
    borderRadius: 20,
  },
  playButtonWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 0.5,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
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
