import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import CollisionMap from './CollisionMap';

export default function App() {
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <Text style={styles.webNotice}>Map is not supported on web.</Text>
      ) : (
        <CollisionMap />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webNotice: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
