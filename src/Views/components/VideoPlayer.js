/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import Foundation from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const PRIMARY_COLOR_CONFLOWER_B4 = '#3e50b4';

export default class VideoPlayer extends Component {
  static defaultProps = {
    toggleResizeModeOnFullscreen: true,
    playInBackground: false,
    playWhenInactive: false,
    showOnStart: true,
    resizeMode: 'cover',
    paused: false,
    repeat: false,
    volume: 1,
    muted: false,
    title: '',
    rate: 1,
    isFullscreen: false,
    CustomVideoWrapper: TouchableWithoutFeedback,
  };

  constructor(props) {
    super(props);

    this.state = {
      // Video
      resizeMode: this.props.resizeMode,
      paused: this.props.paused,
      muted: this.props.muted,
      volume: this.props.volume || 1,
      rate: this.props.rate,
      CustomVideoWrapper:
        this.props.CustomVideoWrapper || TouchableWithoutFeedback,

      isFullscreen:
        this.props.isFullScreen || this.props.resizeMode === 'cover' || false,
      showTimeRemaining: true,
      volumeTrackWidth: 0,
      lastScreenPress: 0,
      volumeFillWidth: 0,
      seekerFillWidth: 0,
      showControls: this.props.showOnStart,
      volumePosition: 0,
      seekerPosition: 0,
      volumeOffset: 0,
      seekerOffset: 0,
      seeking: false,
      loading: false,
      currentTime: 0,
      error: false,
      duration: 0,
      seekFrom: this.props.seekFrom || 0,
      showReplay: false,
    };

    this.opts = {
      playWhenInactive: this.props.playWhenInactive,
      playInBackground: this.props.playInBackground,
      repeat: this.props.repeat,
      title: this.props.title,
    };

    this.events = {
      onError: this.props.onError || this._onError.bind(this),
      onBack: this.props.onBack || this._onBack.bind(this),
      onEnd: this.props.onEnd || this._onEnd.bind(this),
      onScreenTouch: this._onScreenTouch.bind(this),
      onEnterFullscreen: this.props.onEnterFullscreen,
      onExitFullscreen: this.props.onExitFullscreen,
      onLoadStart: this._onLoadStart.bind(this),
      onProgress: this._onProgress.bind(this),
      onLoad: this._onLoad.bind(this),
      onPause: this.props.onPause,
      onPlay: this.props.onPlay,
    };

    this.methods = {
      toggleFullscreen: this._toggleFullscreen.bind(this),
      togglePlayPause: this._togglePlayPause.bind(this),
      toggleControls: this._toggleControls.bind(this),
      toggleTimer: this._toggleTimer.bind(this),
    };

    this.player = {
      controlTimeoutDelay: this.props.controlTimeout || 15000,
      volumePanResponder: PanResponder,
      seekPanResponder: PanResponder,
      controlTimeout: null,
      volumeWidth: 150,
      iconOffset: 0,
      seekerWidth: 0,
      ref: Video,
    };

    const initialValue = this.props.showOnStart ? 1 : 0;

    this.animations = {
      bottomControl: {
        marginBottom: new Animated.Value(0),
        opacity: new Animated.Value(initialValue),
      },
      topControl: {
        marginTop: new Animated.Value(0),
        opacity: new Animated.Value(initialValue),
      },
      video: {
        opacity: new Animated.Value(1),
      },
      loader: {
        rotate: new Animated.Value(0),
        MAX_VALUE: 360,
      },
    };

    /**
     * Various styles that be added...
     */
    this.styles = {
      videoStyle: this.props.videoStyle || {},
      containerStyle: this.props.style || {},
    };
  }

  _onLoadStart() {
    let state = this.state;
    state.loading = true;
    state.showReplay = false;
    this.setState(state);
    if (typeof this.props.onLoadStart === 'function') {
      this.props.onLoadStart(...arguments);
    }
  }

  _onLoad(data = {}) {
    let state = this.state;

    state.duration = data.duration;
    state.loading = false;
    state.showReplay = false;
    this.setState(state);

    if (state.showControls) {
      this.setControlTimeout();
    }

    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad(...arguments);
    }
  }

  _onProgress(data = {}) {
    let state = this.state;
    state.currentTime = data.currentTime;

    if (!state.seeking) {
      const position = this.calculateSeekerPosition();
      this.setSeekerPosition(position);
    }

    if (typeof this.props.onProgress === 'function') {
      this.props.onProgress(...arguments);
    }

    this.setState(state);
  }

  _onEnd() {
    this.setState({
      showReplay: true,
    });
  }

  _onError(_err) {
    let state = this.state;
    state.error = true;
    state.loading = false;
    state.showReplay = false;
    this.setState(state);
  }

  _onScreenTouch() {
    let state = this.state;
    const time = new Date().getTime();
    const delta = time - state.lastScreenPress;

    if (delta < 300) {
      this.methods.toggleFullscreen();
    }

    this.methods.toggleControls();
    state.lastScreenPress = time;

    this.setState(state);
  }

  setControlTimeout() {
    this.player.controlTimeout = setTimeout(() => {
      this._hideControls();
    }, this.player.controlTimeoutDelay);
  }

  clearControlTimeout() {
    clearTimeout(this.player.controlTimeout);
  }

  resetControlTimeout() {
    this.clearControlTimeout();
    this.setControlTimeout();
  }

  replayAgain() {
    this.seekTo(0);
    this.setControlTimeout();
    this.setState({
      seeking: false,
    });
  }

  hideControlAnimation() {
    Animated.parallel([
      Animated.timing(this.animations.topControl.opacity, { toValue: 0 }),
      Animated.timing(this.animations.topControl.marginTop, { toValue: 0 }),
      Animated.timing(this.animations.bottomControl.opacity, { toValue: 0 }),
      Animated.timing(this.animations.bottomControl.marginBottom, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  showControlAnimation() {
    Animated.parallel([
      Animated.timing(this.animations.topControl.opacity, { toValue: 1 }),
      Animated.timing(this.animations.topControl.marginTop, { toValue: 0 }),
      Animated.timing(this.animations.bottomControl.opacity, { toValue: 1 }),
      Animated.timing(this.animations.bottomControl.marginBottom, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  _hideControls() {
    if (this.mounted) {
      let state = this.state;
      state.showControls = false;
      this.hideControlAnimation();

      this.setState(state);
    }
  }

  _toggleControls() {
    let state = this.state;
    state.showControls = !state.showControls;

    if (state.showControls) {
      this.showControlAnimation();
      this.setControlTimeout();
    } else {
      this.hideControlAnimation();
      this.clearControlTimeout();
    }

    this.setState(state);
  }

  _toggleFullscreen() {
    let state = this.state;

    state.isFullscreen = !state.isFullscreen;

    if (this.props.toggleResizeModeOnFullscreen) {
      state.resizeMode = 'cover';
    }

    if (state.isFullscreen) {
      typeof this.events.onEnterFullscreen === 'function' &&
        this.events.onEnterFullscreen();
    } else {
      typeof this.events.onExitFullscreen === 'function' &&
        this.events.onExitFullscreen();
    }

    this.setState(state);
  }

  _togglePlayPause() {
    let state = this.state;
    state.paused = !state.paused;

    if (state.paused) {
      typeof this.events.onPause === 'function' && this.events.onPause();
    } else {
      typeof this.events.onPlay === 'function' && this.events.onPlay();
    }

    this.setState(state);
  }

  _toggleTimer() {
    let state = this.state;
    state.showTimeRemaining = !state.showTimeRemaining;
    this.setState(state);
  }

  _onBack() {
    if (this.props.navigator && this.props.navigator.goBack) {
      this.props.navigator.goBack();
    } else {
      console.warn(
        'Warning: _onBack requires navigator property to function. Either modify the onBack prop or pass a navigator prop',
      );
    }
  }

  calculateTime() {
    if (this.state.showTimeRemaining) {
      const time = this.state.duration - this.state.currentTime;

      return `-${this.formatTime(time)}`;
    }

    return this.formatTime(this.state.currentTime);
  }

  formatTime(time = 0) {
    const symbol = this.state.showRemainingTime ? '-' : '';
    time = Math.min(Math.max(time, 0), this.state.duration);

    const formattedMinutes = _.padStart(Math.floor(time / 60).toFixed(0), 2, 0);
    const formattedSeconds = _.padStart(Math.floor(time % 60).toFixed(0), 2, 0);

    return `${symbol}${formattedMinutes}:${formattedSeconds}`;
  }

  setSeekerPosition(position = 0) {
    let state = this.state;
    position = this.constrainToSeekerMinMax(position);

    state.seekerFillWidth = position;
    state.seekerPosition = position;

    if (!state.seeking) {
      state.seekerOffset = position;
    }

    this.setState(state);
  }

  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.player.seekerWidth) {
      return this.player.seekerWidth;
    }
    return val;
  }

  calculateSeekerPosition() {
    const percent = this.state.currentTime / this.state.duration;
    return this.player.seekerWidth * percent;
  }

  calculateTimeFromSeekerPosition() {
    const percent = this.state.seekerPosition / this.player.seekerWidth;
    return this.state.duration * percent;
  }

  seekTo(time = this.state.seekFrom || 0) {
    let state = this.state;
    state.currentTime = time;
    state.showReplay = false;
    this.player.ref.seek(time);
    this.setState(state);
  }

  setVolumePosition(position = 0) {
    let state = this.state;
    position = this.constrainToVolumeMinMax(position);
    state.volumePosition = position + this.player.iconOffset;
    state.volumeFillWidth = position;

    state.volumeTrackWidth = this.player.volumeWidth - state.volumeFillWidth;

    if (state.volumeFillWidth < 0) {
      state.volumeFillWidth = 0;
    }

    if (state.volumeTrackWidth > 150) {
      state.volumeTrackWidth = 150;
    }

    this.setState(state);
  }

  constrainToVolumeMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.player.volumeWidth + 9) {
      return this.player.volumeWidth + 9;
    }
    return val;
  }

  calculateVolumeFromVolumePosition() {
    return this.state.volumePosition / this.player.volumeWidth;
  }

  calculateVolumePositionFromVolume() {
    return this.player.volumeWidth * this.state.volume;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var stateObj = prevState;
    if (stateObj.paused !== nextProps.paused) {
      stateObj.paused = nextProps.paused;
    }
    return stateObj === prevState ? null : stateObj;
  }
  componentDidUpdate(nextProps) {
    if (this.styles.videoStyle !== nextProps.videoStyle) {
      this.styles.videoStyle = nextProps.videoStyle;
    }

    if (this.styles.containerStyle !== nextProps.style) {
      this.styles.containerStyle = nextProps.style;
    }
  }

  componentDidMount() {
    this.initSeekPanResponder();
    this.initVolumePanResponder();
    const position = this.calculateVolumePositionFromVolume();
    let state = this.state;
    this.setVolumePosition(position);
    state.volumeOffset = position;
    this.mounted = true;
    AppState.addEventListener('change', this._handleAppStateChange);
    this.setState(state);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.clearControlTimeout();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = () => {
    if (AppState.currentState == 'background') {
      let state = this.state;
      state.paused = !state.paused;
    }
    if (AppState.currentState == 'active') {
      //   resume();
    }
  };

  initSeekPanResponder() {
    this.player.seekPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (_evt, _gestureState) => true,
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,

      onPanResponderGrant: (_evt, _gestureState) => {
        let state = this.state;
        this.clearControlTimeout();
        state.seeking = true;
        this.setState(state);
      },

      onPanResponderMove: (_evt, gestureState) => {
        const position = this.state.seekerOffset + gestureState.dx;
        this.setSeekerPosition(position);
      },

      onPanResponderRelease: (_evt, _gestureState) => {
        const time = this.calculateTimeFromSeekerPosition();
        let state = this.state;
        if (time >= state.duration && !state.loading) {
          state.paused = true;
          this.events.onEnd();
        } else {
          this.seekTo(time);
          this.setControlTimeout();
          state.seeking = false;
        }
        this.setState(state);
      },
    });
  }

  initVolumePanResponder() {
    this.player.volumePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (_evt, _gestureState) => true,
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onPanResponderGrant: (_evt, _gestureState) => {
        this.clearControlTimeout();
      },

      onPanResponderMove: (_evt, gestureState) => {
        let state = this.state;
        const position = this.state.volumeOffset + gestureState.dx;

        this.setVolumePosition(position);
        state.volume = this.calculateVolumeFromVolumePosition();

        if (state.volume <= 0) {
          state.muted = true;
        } else {
          state.muted = false;
        }

        this.setState(state);
      },

      onPanResponderRelease: (_evt, _gestureState) => {
        let state = this.state;
        state.volumeOffset = state.volumePosition;
        this.setControlTimeout();
        this.setState(state);
      },
    });
  }

  renderControl(children, callback, style = {}) {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={() => {
          this.resetControlTimeout();
          callback();
        }}
        style={[styles.controls.control, style]}>
        {children}
      </TouchableHighlight>
    );
  }

  renderNullControl() {
    return <View style={[styles.controls.control]} />;
  }

  renderTopControls() {
    const backControl = this.props.disableBack
      ? this.renderNullControl()
      : this.renderBack();
    const volumeControl = this.props.disableVolume
      ? this.renderNullControl()
      : this.renderVolume();
    const fullscreenControl = this.props.disableFullscreen
      ? this.renderNullControl()
      : this.renderFullscreen();

    return (
      <Animated.View
        style={[
          styles.controls.top,
          {
            opacity: this.animations.topControl.opacity,
            marginTop: this.animations.topControl.marginTop,
          },
        ]}>
        <View style={[styles.controls.column]}>
          <SafeAreaView style={styles.controls.topControlGroup}>
            {backControl}
            <View
              style={
                this.props.flag
                  ? styles.controls.pullRight
                  : styles.controls.pullLefts
              }>
              {volumeControl}
              {/* {fullscreenControl} */}
            </View>
          </SafeAreaView>
        </View>
      </Animated.View>
    );
  }

  renderBack() {
    return this.renderControl(
      <FontAwesome name={'chevron-left'} color={'#ffffff'} size={20} />,
      this.events.onBack,
      styles.controls.back,
    );
  }

  renderVolume() {
    const { volumeFillWidth, volumePosition, volumeTrackWidth } = this.state;

    return isNaN(volumeFillWidth) ||
      isNaN(volumeTrackWidth) ||
      isNaN(volumePosition) ? null : (
      <View style={styles.volume.container}>
        <View style={[styles.volume.fill, { width: volumeFillWidth }]} />
        <View style={[styles.volume.track, { width: volumeTrackWidth }]} />
        <View
          style={[styles.volume.handle, { left: volumePosition }]}
          {...this.player.volumePanResponder.panHandlers}>
          <View style={styles.volume.circle} />
        </View>
      </View>
    );
  }

  renderFullscreen() {
    return this.renderControl(
      <Foundation
        name={this.state.isFullscreen ? 'shrink' : 'arrowsalt'}
        size={25}
        color={'#ffffff'}
      />,
      this.methods.toggleFullscreen,
      styles.controls.fullscreen,
    );
  }

  renderBottomControls() {
    const timerControl = this.props.disableTimer
      ? this.renderNullControl()
      : this.renderTimer();
    const seekbarControl = this.props.disableSeekbar
      ? this.renderNullControl()
      : this.renderSeekbar();
    const playPauseControl = this.props.disablePlayPause
      ? this.renderNullControl()
      : this.renderPlayPause();

    return (
      <Animated.View
        style={[
          styles.controls.bottom,
          {
            opacity: this.animations.bottomControl.opacity,
            marginBottom: this.animations.bottomControl.marginBottom,
          },
        ]}>
        <View style={[styles.controls.column]}>
          {seekbarControl}
          <SafeAreaView
            style={[styles.controls.row, styles.controls.bottomControlGroup]}>
            {playPauseControl}
            {this.renderTitle()}
            {timerControl}
          </SafeAreaView>
        </View>
      </Animated.View>
    );
  }

  renderSeekbar() {
    return (
      <View style={styles.seekbar.container}>
        <View
          style={styles.seekbar.track}
          onLayout={(event) => {
            this.player.seekerWidth = event.nativeEvent.layout.width;
          }}>
          <View
            style={[
              styles.seekbar.fill,
              {
                width: this.state.seekerFillWidth + 10,
                backgroundColor: PRIMARY_COLOR_CONFLOWER_B4,
              },
            ]}
          />
        </View>
        <View
          style={[styles.seekbar.handle, { left: this.state.seekerPosition }]}
          {...this.player.seekPanResponder.panHandlers}>
          <View style={[styles.seekbar.circle]} />
        </View>
      </View>
    );
  }

  renderPlayPause() {
    return this.renderControl(
      <FontAwesome5
        name={this.state.paused ? 'play' : 'pause'}
        size={18}
        color={'#ffffff'}
      />,
      this.methods.togglePlayPause,
      styles.controls.playPause,
    );
  }

  renderTitle() {
    if (this.opts.title) {
      return (
        <View style={[styles.controls.control, styles.controls.title]}>
          <Text
            style={[styles.controls.text, styles.controls.titleText]}
            numberOfLines={1}>
            {this.opts.title || ''}
          </Text>
        </View>
      );
    }

    return null;
  }

  renderTimer() {
    return this.renderControl(
      <Text style={styles.controls.timerText}>{this.calculateTime()}</Text>,
      this.methods.toggleTimer,
      styles.controls.timer,
    );
  }

  renderLoader() {
    if (this.state.loading) {
      return (
        <View style={styles.loader.container}>
          <ActivityIndicator
            animating
            size="large"
            color={'#ffffff'}
            hidesWhenStopped={true}
          />
        </View>
      );
    }
    if (this.state.showReplay) {
      return (
        <View
          style={
            this.props.flag
              ? styles.loader.replayAgainFull
              : styles.loader.replayAgainSmall
          }>
          <TouchableOpacity onPress={() => this.replayAgain()}>
            <MaterialIcons name="replay" size={30} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  renderError() {
    if (this.state.error) {
      return (
        <View style={styles.error.container}>
          <MaterialIcons
            name={'error'}
            color={'#f27474'}
            size={30}
            style={{ backgroundColor: 'white' }}
          />
          <View style={{ height: 10 }} />
          <Text style={styles.error.text}>Error while playing video!</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { CustomVideoWrapper } = this.state;
    return (
      <CustomVideoWrapper
        onPress={this.events.onScreenTouch}
        style={[styles.player.container, this.styles.containerStyle]}>
        <View style={[styles.player.container, this.styles.containerStyle]}>
          <Video
            {...this.props}
            ref={(videoPlayer) => (this.player.ref = videoPlayer)}
            resizeMode={this.state.resizeMode}
            volume={this.state.volume}
            paused={this.state.paused}
            muted={this.state.muted}
            rate={this.state.rate}
            onLoadStart={this.events.onLoadStart}
            onProgress={this.events.onProgress}
            onError={this.events.onError}
            onLoad={this.events.onLoad}
            onEnd={this.events.onEnd}
            style={[
              styles.player.video,
              this.styles.videoStyle,
              { borderRadius: 20 },
            ]}
            source={this.props.source}
            playInBackground={false}
            flag={this.props.flag}
          />
          {this.renderError()}
          {this.renderTopControls()}
          {this.renderLoader()}
          {this.renderBottomControls()}
        </View>
      </CustomVideoWrapper>
    );
  }
}

const styles = {
  player: StyleSheet.create({
    container: {
      backgroundColor: '#000',
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    },
    video: {
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  }),
  error: StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: 16,
    },
    text: {
      fontSize: 15,
      backgroundColor: 'transparent',
      color: '#f27474',
    },
  }),
  loader: StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    replayAgainSmall: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    },
    replayAgainFull: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 140,
    },
  }),
  controls: StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: null,
      width: null,
    },
    vignette: {
      resizeMode: 'cover',
    },
    control: {
      padding: 16,
    },
    text: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center',
    },
    pullRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 80,
    },
    pullLefts: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    top: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    bottom: {
      alignItems: 'stretch',
      flex: 2,
      justifyContent: 'flex-end',
    },
    topControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: null,
      margin: 12,
      marginBottom: 18,
    },
    bottomControlGroup: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 0,
    },
    volume: {
      flexDirection: 'row',
    },
    fullscreen: {
      flexDirection: 'row',
    },
    playPause: {
      position: 'relative',
      width: 80,
      zIndex: 0,
    },
    title: {
      alignItems: 'center',
      flex: 0.6,
      flexDirection: 'column',
      padding: 0,
    },
    titleText: {
      textAlign: 'center',
    },
    timer: {
      width: 100,
    },
    timerText: {
      backgroundColor: 'transparent',
      color: '#FFF',
      fontSize: 18,
      textAlign: 'right',
    },
  }),
  volume: StyleSheet.create({
    container: {
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      height: 1,
      marginRight: 40,
      width: 150,
    },
    track: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: 3,
      borderRadius: 3 / 2,
      marginLeft: 7,
    },
    fill: {
      backgroundColor: '#fff',
      height: 3,
      borderRadius: 3 / 2,
    },
    handle: {
      position: 'absolute',
      marginTop: -24,
      marginLeft: -24,
      padding: 16,
    },
    icon: {
      marginLeft: 7,
    },
    circle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      backgroundColor: '#ffffff',
    },
  }),
  seekbar: StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      height: 28,
      marginLeft: 20,
      marginRight: 20,
    },
    track: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: 3,
      borderRadius: 3 / 2,
      position: 'relative',
      top: 14,
      width: '100%',
    },
    fill: {
      backgroundColor: PRIMARY_COLOR_CONFLOWER_B4,
      height: 3,
      borderRadius: 3 / 2,
      width: '100%',
    },
    handle: {
      position: 'absolute',
      marginLeft: -8,
      height: 28,
      width: 28,
    },
    circle: {
      backgroundColor: PRIMARY_COLOR_CONFLOWER_B4,
      borderRadius: 7.5,
      position: 'relative',
      top: 9,
      left: 8,
      height: 15,
      width: 15,
    },
  }),
};
