// In App.js in a new project

import { Col, Row, Text, View } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

const Header = ({ imageUri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Row style={styles.header}>
      <Col>
        <Text uppercase style={styles.today}>
          Today
        </Text>
        <Text style={styles.myFeed}>My Feed</Text>
      </Col>
      <View style={styles.avatarWrapper}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://randomuser.me/api/portraits/lego/5.jpg',
          }}
        />
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderBottomColor: '#ddd',
    backgroundColor: '#eee',
    height: 120,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  today: {
    fontSize: 15,
    color: '#aaa',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  myFeed: {
    marginLeft: 20,
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  avatarWrapper: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    marginRight: 20,
    borderRadius: 25,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default Header;
