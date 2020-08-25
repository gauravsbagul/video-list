// In App.js in a new project

import { View } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Header from './components/Header';
import VideoCard from './components/VideoCard';

const DATA = {
  videos: [
    {
      title: 'video small',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      video_url: 'https://www.w3schools.com/htmL/mov_bbb.mp4',
    },
    {
      title: 'video medium',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      video_url: 'http://techslides.com/demos/sample-videos/small.mp4',
    },
    {
      title: 'video medium & long',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    },
    {
      title: 'video big',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      title: 'video small',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      video_url: 'https://www.w3schools.com/htmL/mov_bbb.mp4',
    },
    {
      title: 'video medium',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      video_url: 'http://techslides.com/demos/sample-videos/small.mp4',
    },
    {
      title: 'video medium & long',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    },
    {
      title: 'video big',
      thumbnail_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      video_url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
  ],
};

const MyFeed = ({ navigation }) => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={DATA.videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <VideoCard item={item} index={index} />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
  },
});

export default MyFeed;
