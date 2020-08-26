/* eslint-disable react-native/no-inline-styles */
import { Button, Container, Input, InputGroup, Text, View } from 'native-base';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
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
      isLoading: false,
      isAuthenticated: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var stateObj = prevState;
    if (
      !nextProps.authentication?.userLoggedOut &&
      !nextProps.authentication?.login?.error
    ) {
      stateObj.isLoading = false;
      stateObj.isAuthenticated = true;
    }

    return stateObj === prevState ? null : stateObj;
  }

  componentDidUpdate() {
    if (this.state.isAuthenticated && !this.state.isLoading)
      this.props.navigation.navigate('TabNav');
  }

  handleLogin = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      Alert.alert(
        `Error`,
        `Please fill all the required fields`,
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    } else {
      if (!emailReg.test(email.trim())) {
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
          email,
          password,
        };
        this.props.login(data);
      }
    }
  };

  render() {
    const { showLoader, hidePassword } = this.state;
    return (
      <>
        <Container>
          <View style={styles.container}>
            <>
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
            </>
          </View>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ authentication }) => {
  return { authentication };
};
const mapDispatchToProps = {
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
  },
  tabWrapper: {
    backgroundColor: '#0000',
    padding: 20,
    borderRadius: 20,
  },
  inputGroup: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  inputWrapper: {
    marginVertical: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5499C7',
    marginTop: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
