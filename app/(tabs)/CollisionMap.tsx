import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GEOJSON_URL = 'https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Collisions/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson';

export default function CollisionMap() {
  const [collisions, setCollisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(response => response.json())
      .then(data => {
        setCollisions(data.features || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 45.4215,  // Ottawa center
        longitude: -75.6997,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
      
    >
      {collisions.map((feature, idx) => (
        <Marker
          key={idx}
          coordinate={{
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          }}
          title={feature.properties.Location}
          description={`Date: ${feature.properties.Accident_Date}, Injury: ${feature.properties.Max_injury || 'N/A'}`}
          pinColor="#cc3333" // custom color for collision
        />
      ))}
    </MapView>
  );
}