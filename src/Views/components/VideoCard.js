// @ts-nocheck
/* eslint-disable no-undef */
import { Card, Text, View } from 'native-base';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from './VideoPlayer';
import VideoDetails from './VideoDetails';
export default VideoCard = ({ item, index, shareImageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card style={styles.card}>
      {isPlaying ? (
        <>
          <VideoPlayer
            style={styles.thumbnail}
            showOnStart={true}
            source={{ uri: item.video_url }}
            controlTimeout={150000}
            disableBack
            resizeMode="cover"
            paused={false}
            CustomVideoWrapper={View}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
          <VideoDetails item={item} shareImageUrl={shareImageUrl} />
        </>
      ) : (
        <ImageBackground
          style={styles.thumbnail}
          resizeMode={'cover'}
          imageStyle={styles.thumbnailImage}
          source={{ uri: item.thumbnail_url }}>
          <TouchableOpacity
            style={styles.playButtonWrapper}
            onPress={() => setIsPlaying(true)}>
            <FontAwesome name={'play'} size={15} color={'#fff'} />
          </TouchableOpacity>
          <VideoDetails item={item} shareImageUrl={shareImageUrl} />
        </ImageBackground>
      )}
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
    borderRadius: 20,
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
});
