import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SupportPage = () => {
  return (
    <View style={styles.container}>
      <Text>Support Screen</Text>
    </View>
  );
};

export default SupportPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
