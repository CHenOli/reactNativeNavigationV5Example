import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="go to details screen"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
