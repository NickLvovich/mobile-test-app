import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => navigation.navigate('Details')}
          title="Go to details"
        />
      </View>
    );
  };

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})