import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';

import {AuthContext} from '../../components/context';

import {inject, observer} from 'mobx-react';

const SignInScreen = (props) => {
  const {
    email,
    password,
    check_textInputChange,
    secureTextEntry,
    isValidUser,
    isValidPassword,
    fetchUser,
    userData,
  } = props.store;


  const {colors} = useTheme();

  const [inputData, setInputData] = useState({
    email,
    password,
    check_textInputChange,
    secureTextEntry,
    isValidUser,
    isValidPassword,
  });

  const {signIn} = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 8) {
      setInputData({
        ...inputData,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setInputData({
        ...inputData,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
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
  const updateSecureTextEntry = (val) => {
    setInputData({
      ...inputData,
      secureTextEntry: !inputData.secureTextEntry,
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

  const loginHandle = async (email, password) => {
    await fetchUser(email, password);

    const foundUser = userData.data;

 
    if (userData.message === 'The given data was invalid.') {
      Alert.alert('Invalid User!', 'Email or password', [{text: 'Ok'}]);
    } else if (userData.message === 'already authenticated') {
      Alert.alert('User already authenticated!', [{text: 'Ok'}]);
    }

    if (foundUser !== undefined) {
      await signIn(foundUser);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDownBig" style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Email"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
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

        <Text
          style={[
            styles.text_footer,
            {marginTop: 35},
            {
              color: colors.text,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={inputData.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Feather
              name={inputData.secureTextEntry ? 'eye-off' : 'eye'}
              color={colors.text}
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

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              {
                loginHandle(inputData.email, inputData.password);
              }
            }}>
            <LinearGradient
              colors={['#191919', '#2c2c2c']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: colors.background,
                  },
                ]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SignUpScreen')}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default inject('store')(observer(SignInScreen));

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
    paddingHorizontal: 20,
    paddingVertical: 30,
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
