import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import severity colors for consistent styling
import { SeverityColors } from '@/constants/Colors';

// Ottawa collision data endpoint (GeoJSON)
const GEOJSON_URL = 'https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Collisions/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson';

// helper to dynamically pick pin color based on data
const getPinColor = (maxInjury: string | null) => {
  // default to 'None' (Grey) if no injury data
  if (!maxInjury) return SeverityColors.None;
  
  // convert to lowercase for case-insensitive matching
  const injury = maxInjury.toLowerCase();

  // map API keywords to severity levels
  if (injury.includes('fatal')) return SeverityColors.Fatal;   // fatalities get dark red
  if (injury.includes('major')) return SeverityColors.Major;
  if (injury.includes('minor')) return SeverityColors.Minor;
  if (injury.includes('minimal')) return SeverityColors.Minimal;

  // return default fallback if no match
  return SeverityColors.Default;
};

export default function CollisionMap() {
  // state for collision data & loading status
  const [collisions, setCollisions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data once when component mounts
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(response => response.json())
      .then(data => {
        // extract 'features' array and update state
        setCollisions(data.features || []);
        setLoading(false); // data loaded, kill spinner
      })
      .catch(() => {
        // stop loading state if fetch fails so UI doesn't hang
        setLoading(false);
      });
  }, []);

  // show spinner while waiting for network
  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    // render MapView centered on Ottawa
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 45.4215,  // Ottawa center lat
        longitude: -75.6997, // Ottawa center long
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
    >
      {/* iterate through collisions to create markers */}
      {collisions.map((feature, idx) => (
        <Marker
          key={idx} // unique key for react
          coordinate={{
            // GeoJSON is [long, lat], mapping it correctly here
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          }}
          // title and desc for tap details
          title={feature.properties.Location}
          description={`Date: ${feature.properties.Accident_Date}, Injury: ${feature.properties.Max_injury || 'None'}`}
          // call helper to apply color coding
          pinColor={getPinColor(feature.properties.Max_injury)}
        />
      ))}
    </MapView>
  );
}
