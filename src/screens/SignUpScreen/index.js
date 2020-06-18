import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';

import {AuthContext} from '../../components/context';

import {inject, observer} from 'mobx-react';

const SignUpScreen = (props) => {
  const {
    email,
    password,
    check_textInputChange,
    secureTextEntry,
    confirm_secureTextEntry,
    confirm_password,
    register,
    userData,
    logout,
    isValidUser,
    isValidPassword,
    isConfirmValidPassword,
  } = props.store;

  const {signUp} = useContext(AuthContext);

  const [inputData, setInputData] = useState({
    email,
    password,
    confirm_password,
    check_textInputChange,
    secureTextEntry,
    confirm_secureTextEntry,
    isValidUser,
    isValidPassword,
    isConfirmValidPassword,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setInputData({
        ...inputData,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setInputData({
        ...inputData,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setInputData({
        ...inputData,
        password: val,
        isValidPassword: true,
      });
    } else {
      setInputData({
        ...inputData,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setInputData({
        ...inputData,
        confirm_password: val,
        isConfirmValidPassword: true,
      });
    } else {
      setInputData({
        ...inputData,
        confirm_password: val,
        isConfirmValidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = (val) => {
    setInputData({
      ...inputData,
      secureTextEntry: !inputData.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = (val) => {
    setInputData({
      ...inputData,
      confirm_secureTextEntry: !inputData.confirm_secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setInputData({
        ...inputData,
        isValidUser: true,
      });
    } else {
      setInputData({
        ...inputData,
        isValidUser: false,
      });
    }
  };

  const registerHandle = async (email, password, confirm_password) => {
    await register(email, password, confirm_password);

    const registerUser = userData.data;

    await signUp(registerUser);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDownBig" style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView style={styles.footeScrolling}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {inputData.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {inputData.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Email must be 8 characters long.
              </Text>
            </Animatable.View>
          )}
          <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={inputData.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              <Feather
                name={inputData.secureTextEntry ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>
          {inputData.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}
          <Text style={[styles.text_footer, {marginTop: 35}]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={inputData.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              <Feather
                name={inputData.confirm_secureTextEntry ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>
          {inputData.isConfirmValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                registerHandle(
                  inputData.email,
                  inputData.password,
                  inputData.confirm_password,
                );
              }}
              style={styles.signIn}>
              <LinearGradient
                colors={['#191919', '#2c2c2c']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#191919',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#191919',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default inject('store')(observer(SignUpScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
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
    paddingVertical: 5,
  },
  footeScrolling: {
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
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
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
