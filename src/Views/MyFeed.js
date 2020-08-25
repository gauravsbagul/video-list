/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import { View, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import { connect } from 'react-redux';
import { getVideos } from '../Redux/actions/videoList';

const MyFeed = ({ navigation, getVideos, videos }) => {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVideosFromAPI();
  }, []);

  useEffect(() => {
    console.log('MyFeed -> props.videos', videos);
    if (
      !videos?.getAllVideos?.error &&
      videos?.getAllVideos?.response?.videos
    ) {
      setIsLoading(false);
      setVideoList(videos?.getAllVideos?.response?.videos);
    }
  }, [videos]);

  const getVideosFromAPI = async () => {
    getVideos();
  };
  console.log('videoList', videoList);
  return (
    <>
      <Header />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={videoList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <VideoCard item={item} index={index} />
            )}
            ListEmptyComponent={
              <View>
                <Text>Empty</Text>
              </View>
            }
          />
        )}
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

const mapStateToProps = ({ videos }) => {
  return {
    videos,
  };
};
const mapDispatchToProps = {
  getVideos,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFeed);
