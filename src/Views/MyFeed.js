/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import { View, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import { connect } from 'react-redux';
import { getVideos } from '../Redux/actions/videoList';
import ImagePicker from 'react-native-image-picker';

const MyFeed = ({ navigation, getVideos, videos }) => {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://randomuser.me/api/portraits/lego/5.jpg',
  );

  useEffect(() => {
    getVideosFromAPI();
  }, []);

  useEffect(() => {
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

  const selectAvatar = async () => {
    console.log('selectAvatar -> selectAvatar');

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'images',
      videoQuality: 'medium',
    };
    await ImagePicker.showImagePicker(options, (results) => {
      if (results.didCancel) {
      } else if (results.error) {
        Alert.alert('', results.error, [{ text: 'Ok' }]);
      } else {
        setAvatar(results.uri);
      }
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getVideosFromAPI();
    setRefreshing(false);
  };

  return (
    <>
      <Header avatar={avatar} selectAvatar={selectAvatar} />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
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
