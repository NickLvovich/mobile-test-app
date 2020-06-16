/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {View} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {Provider as MobxProvider} from 'mobx-react';

import {DrawerContent} from './src/screens/DrawerContent';

import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import SettingScreen from './src/screens/SettingScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';

import {AuthContext} from './src/components/context';
import store from './src/components/store';

import RootStackScreen from './src/screens/RootStackScreen';
import {ActivityIndicator} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';
import 'mobx-react-lite/batchingForReactNative';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#fff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = foundUser.secret;
        const email = foundUser.name;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log('error', e);
        }

        dispatch({type: 'LOGIN', id: email, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log('error', e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    let userToken;
    userToken = null;
    try {
      userToken = AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    console.log(userToken)
    dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MobxProvider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken === null ? (
              <RootStackScreen />
            ) : (
              <Drawer.Navigator
                drawerContent={(drawerProps) => <DrawerContent {...drawerProps} />}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                <Drawer.Screen name="SettingScreen" component={SettingScreen} />
                <Drawer.Screen
                  name="BookmarkScreen"
                  component={BookmarkScreen}
                />
              </Drawer.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </MobxProvider>
  );
};

export default App;
