import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

function HomePage({ navigation }) {
  const { colors, dark } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={dark ? '#000000' : '#009387'}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      <Text style={{ color: colors.text }}>Home Screen</Text>
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
