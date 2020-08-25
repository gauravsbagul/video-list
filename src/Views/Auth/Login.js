/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import {
  Button,
  Input,
  InputGroup,
  Row,
  Tab,
  Tabs,
  Text,
  View,
  Container,
  Content,
} from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../Redux/actions/auth';
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hidePassword: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var stateObj = prevState;

    return stateObj === prevState ? null : stateObj;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {
    return true;
  }

  handleLogin = async () => {
    console.log('TCL: Login -> handleLogin -> handleLogin');
    const { email, password } = this.state;
    if (!email || !password) {
      Alert.alert(
        `Error`,
        `Plese fill all the required fields`,
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    } else {
      if (!emailReg.test(this.state.email.trim())) {
        Alert.alert(
          'Unauthorized user',
          'Please enter valid Email Id',
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      } else {
        this.setState({
          showLoader: true,
        });
        const data = {
          email: this.state.email,
          password: this.state.password,
        };
        this.props._login(data);
      }
    }
  };

  render() {
    const { showLoader, hidePassword } = this.state;
    return (
      <>
        <Container style={[styles.container]}>
          <Content
            padder
            style={{
              // alignItems: 'center',
              // flexDirection: 'row',
              // alignSelf: 'center',
              // justifyContent: 'center',
              flex: 1,
              backgroundColor: '#0000',
            }}>
            <View style={styles.inputWrapper}>
              <InputGroup style={styles.inputGroup}>
                <Input
                  placeholder="Email ID"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  keyboardType="email-address"
                  returnKeyType="done"
                />
              </InputGroup>
            </View>

            <View style={styles.inputWrapper}>
              <InputGroup style={styles.inputGroup}>
                <Input
                  placeholder="Password"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  keyboardType="default"
                  returnKeyType="go"
                  onSubmitEditing={() => this.handleLogin()}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ hidePassword: !this.state.hidePassword })
                  }>
                  <Text uppercase style={{ marginRight: 10 }}>
                    {hidePassword ? 'Show' : 'Hide'}
                  </Text>
                </TouchableOpacity>
              </InputGroup>
            </View>

            <Button
              rounded
              style={styles.button}
              onPress={() => this.handleLogin()}>
              {showLoader ? (
                <ActivityIndicator size="large" color="#FFFFFF" animating />
              ) : (
                <Text>{'Login'}</Text>
              )}
            </Button>
          </Content>
        </Container>
      </>
    );
  }
}
// const mapStateToProps = (state) => {};
const mapDispatchToProps = {
  login,
};
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabWrapper: {
    backgroundColor: '#0000',
    padding: 20,
    borderRadius: 20,
  },
  inputGroup: {
    borderBottomWidth: 0,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  inputWrapper: {
    borderBottomColor: '#000',
    marginVertical: 5,
    borderBottomWidth: 0.5,
  },
  button: {
    width: '100%',
    backgroundColor: '#5499C7',
    marginTop: 30,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
