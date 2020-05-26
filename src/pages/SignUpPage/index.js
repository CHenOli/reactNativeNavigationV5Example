import React, { useState } from 'react';
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
} from 'react-native';

const SignInPage = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    textInputChange: false,
    passwordSecureTextEntry: true,
    confirmSecureTextEntry: true,
  });

  const handleEmailInputChange = (text) => {
    if (text.length !== 0) {
      setData({
        ...data,
        email: text,
        textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: text,
        textInputChange: false,
      });
    }
  };

  const handlePasswordInputChange = (text) => {
    setData({
      ...data,
      password: text,
    });
  };

  const handleConfirmPasswordInputChange = (text) => {
    setData({
      ...data,
      confirmPassword: text,
    });
  };

  const togglePasswordVisible = () => {
    setData({
      ...data,
      passwordSecureTextEntry: !data.passwordSecureTextEntry,
    });
  };

  const toggleConfirmPasswordVisible = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="your email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => {
              handleEmailInputChange(text);
            }}
          />
          {data.textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={(styles.textFooter, styles.password)}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            secureTextEntry={data.passwordSecureTextEntry}
            placeholder="your password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => {
              handlePasswordInputChange(text);
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisible}>
            {data.passwordSecureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={(styles.textFooter, styles.password)}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            secureTextEntry={data.confirmSecureTextEntry}
            placeholder="confirm password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => {
              handleConfirmPasswordInputChange(text);
            }}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisible}>
            {data.confirmSecureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text style={styles.textSignIn}>Sign Up</Text>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.signUp}>
            <Text style={styles.textSignUp}>Sign In</Text>
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
