import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const DetailsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button
          onPress={() => navigation.push('Details')}
          title="Go to details...again"
        />
        <Button onPress={() => navigation.navigate('Home')} title="Go to home" />
        <Button onPress={() => navigation.goBack()} title="Go back" />
      </View>
    );
  };

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})