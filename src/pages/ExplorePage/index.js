import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const darkMapStyle = require('../../../assets/map-style/dark.json');
const standardMapStyle = require('../../../assets/map-style/standard.json');

const ExplorePage = () => {
  const { dark } = useTheme();

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      customMapStyle={dark ? darkMapStyle : standardMapStyle}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Marker
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        image={require('../../../assets/map_marker.png')}
        title="test title"
        description="this is the description">
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.name}>Favourite Restaurant</Text>
              {/* <Text style={styles.name}>Shot Description</Text> */}
              <Image
                style={styles.image}
                source={require('../../../assets/banners/food-banner1.jpg')}
              />
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 80,
  },
});
