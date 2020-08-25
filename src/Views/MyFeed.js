/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import { View, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import Share from 'react-native-share';

import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  BackHandler,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { getVideos } from '../Redux/actions/videoList';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import { logout } from './../Redux/actions/auth';

const MyFeed = (props) => {
  const { navigation, getVideos, videos } = props;
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://randomuser.me/api/portraits/lego/5.jpg',
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => logMeOut(),
        style: 'destructive',
      },
    ]);
    return true;
  };

  const logMeOut = () => {
    props.logout();
    BackHandler.exitApp();
  };

  const getVideosFromAPI = async () => {
    getVideos();
  };

  const selectAvatar = async () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
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

  const shareImageUrl = (item) => {
    console.log('TCL:: shareImageUrl -> item', item);
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            // For sharing url with custom title.
            placeholderItem: { type: 'url', content: item.video_url },
            item: {
              default: { type: 'url', content: item.video_url },
            },
            subject: {
              default: item.video_title,
            },
            linkMetadata: {
              originalUrl: item.video_url,
              url: item.video_url,
              title: item.video_title,
            },
          },
          {
            // For sharing text.
            placeholderItem: {
              type: 'text',
              content: 'checkout this awesome video',
            },
            item: {
              default: { type: 'text', content: 'checkout this awesome video' },
              message: null, // Specify no text to share via Messages app.
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title: 'checkout this awesome video',
            },
          },
          {
            // For using custom icon instead of default text icon at share preview when sharing with message.
            placeholderItem: {
              type: 'url',
            },
            item: {
              default: {
                type: 'text',
                content: item.video_url,
              },
            },
          },
        ],
      },
      default: {
        title: item.video_url,
        message: item.video_url,
      },
    });
    Share.open(options)
      .then((res) => {
        console.log('TCL:: shareImageUrl -> res', res);
      })
      .catch((err) => {
        console.log('TCL:: shareImageUrl -> err', err);
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
              <VideoCard
                item={item}
                index={index}
                shareImageUrl={shareImageUrl}
              />
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
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFeed);
