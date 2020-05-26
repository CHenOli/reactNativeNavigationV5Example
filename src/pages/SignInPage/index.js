import React, { useState, useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';

import { Users } from '../../model/index';
import { AuthContext } from '../../components/AuthContext';

const SignInPage = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = useContext(AuthContext);

  const handleUsernameInputChange = (text) => {
    if (text.trim().length >= 4) {
      setData({
        ...data,
        username: text,
        textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: text,
        textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordInputChange = (text) => {
    if (text.trim().length >= 8) {
      setData({
        ...data,
        password: text,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: text,
        isValidPassword: false,
      });
    }
  };

  const togglePasswordVisible = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLogin = () => {
    const foundUser = Users.filter((item) => {
      return data.username === item.username && data.password === item.password;
    });

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert('Empty Fields', 'Username and password must not be empty', [
        {
          text: 'DISMISS',
        },
      ]);
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User', 'Username or password are invalid', [
        {
          text: 'DISMISS',
        },
      ]);
      return;
    }

    signIn(foundUser);
  };

  const handleValidateUser = (text) => {
    if (text.length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="your username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => {
              handleUsernameInputChange(text);
            }}
            onEndEditing={(e) => {
              handleValidateUser(e.nativeEvent.text);
            }}
          />
          {data.textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              username must be, at least, 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <Text style={(styles.textFooter, styles.password)}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            secureTextEntry={data.secureTextEntry}
            placeholder="your password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => {
              handlePasswordInputChange(text);
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisible}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              password must be, at least, 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              handleLogin();
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSignIn}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpPage');
            }}
            style={styles.signUp}>
            <Text style={styles.textSignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    borderColor: '#009387',
    borderWidth: 1,
  },
  textSignIn: {
    fontSize: 18,
    color: '#fff',
  },
  textSignUp: {
    fontSize: 18,
    color: '#009387',
  },
  password: {
    marginTop: 16,
  },
});
