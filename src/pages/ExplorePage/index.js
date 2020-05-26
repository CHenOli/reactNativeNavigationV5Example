import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExplorePage = () => {
  return (
    <View style={styles.container}>
      <Text>ExploreScreen</Text>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
