import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function DetailsPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="go to details screen... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="go to home" onPress={() => navigation.navigate('Login')} />
      <Button title="go back" onPress={() => navigation.goBack()} />
      <Button
        title="go to the first screen"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
