import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
// imports inject and observer from 'mobx-react':
import {inject, observer} from 'mobx-react';

import {AuthContext} from '../../components/context';

const HomeScreen = (props, {navigation}) => {
  const {signOut} = useContext(AuthContext);

  const {logout} = props.store;

  const {colors} = useTheme();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        onPress={() => {
          signOut();
        }}
        title="Go to details"
      />
    </View>
  );
};

export default inject('store')(observer(HomeScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
