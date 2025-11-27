import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CollisionModal from './CollisionModal';
import { SeverityColors } from '../../constants/Colors';
import theme from '../../constants/Colors';

const GEOJSON_URL = 'https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Collisions/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson';

export default function CollisionMap() {
const [collisions, setCollisions] = useState([]);
const [loading, setLoading] = useState(true);

// * State for modal visibility and selected collision
const [modalVisible, setModalVisible] = useState(false);
const [selectedCollision, setSelectedCollision] = useState(null);

// * Function to handle marker press
const handleMarkerPress = (collision) => {
setSelectedCollision({
title: collision.properties.Location,
date: collision.properties.Accident_Date,
severity: collision.properties.Max_injury || "N/A",
description: collision.properties.Description || "No description available.",
});
setModalVisible(true);
};

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
<>
<MapView
style={{ flex: 1 }}
initialRegion={{
latitude: 45.4215, // Ottawa center
longitude: -75.6997,
latitudeDelta: 0.5,
longitudeDelta: 0.5,
}}
>
{collisions.map((feature, idx) => {
  let pinColor;
  const severity = feature.properties.Max_injury;
  if (severity === 'Minor') {
    pinColor = SeverityColors.Minor;
  } else if (severity === 'None') {
    pinColor = SeverityColors.None;
  } else {
    pinColor = SeverityColors.Default;
  }
  return (
    <Marker
      key={idx}
      coordinate={{
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      }}
      title={feature.properties.Location}
      description={`Date: ${feature.properties.Accident_Date}, Injury: ${feature.properties.Max_injury || 'N/A'}`}
      pinColor={pinColor}
      // * When marker is pressed, show modal with details // Gabriel
      onPress={() => handleMarkerPress(feature)}
    />
  );
})}
</MapView>

{/* The modal at the bottom */}
<CollisionModal
visible={modalVisible}
onClose={() => setModalVisible(false)}
data={selectedCollision} // the selected collision info
/>
</>
);
}
