import React from 'react';
import { View, Button, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';
import { Alert } from 'react-native';
const GOOGLE_MAPS_APIKEY = '';
const RADIUS = 1000;

const EatsScreen = ({ navigation }) => {
  const [markers, setMarkers] = React.useState([]);
  const [markersP, setMarkersP] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [routeCoordinates, setRouteCoordinates] = React.useState([]);

  React.useEffect(() => {
    if (selectedLocation && selectedMarker) {
      fetchRouteCoordinates(selectedLocation, selectedMarker);
    }
  }, [selectedLocation, selectedMarker]);

  const fetchToilets = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${RADIUS}&keyword=dairy&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      setMarkers(data.results);
    } catch (error) {
      console.error('Error fetching nearby toilets:', error);
    }
  };

  const fetchPharmacy = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${RADIUS}&keyword=confectionary&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      setMarkersP(data.results);
    } catch (error) {
      console.error('Error fetching nearby pharmacy:', error);
    }
  };

  const fetchRouteCoordinates = async (source, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${source.latitude},${source.longitude}&destination=${destination.geometry.location.lat},${destination.geometry.location.lng}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      const points = data.routes[0].overview_polyline.points;
      const decodedCoordinates = decode(points);
      const coordinates = decodedCoordinates.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setRouteCoordinates(coordinates);
    } catch (error) {
      console.error('Error fetching route coordinates:', error);
    }
  };

  const handleSelectLocation = (data, details) => {
    const selectedLocation = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setSelectedLocation(selectedLocation);
    setSelectedMarker(null);
    fetchToilets(selectedLocation);
    fetchPharmacy(selectedLocation);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleNavigateToAR = async () => {
    try {
      if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
          return;
        }
      }
      
      // Camera permission granted or not on Android, navigate to AR screen
      // Replace 'ARScreen' with the name of your AR screen component
      // Use your preferred navigation library for navigation
      Alert.alert(
        'Grant Camera Permissions',
        'Please grant camera permission to use AR functionality.',
        [
          {
            text: 'OK',
            onPress: () => Alert.alert("Camera Permissions Granted. Redirecting...")
          },
          {
            text: 'Not Now',
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };
  return (
    <View style={{ flex: 1, marginTop: 32 }}>
      <GooglePlacesAutocomplete
        placeholder="Where from?"
        styles={{
          container: {
            flex: 0,
            borderWidth: 3,
            borderRadius: 5,
            backgroundColor: 'pink',
          },
          textInput: {
            fontSize: 15,
            color: 'black',
            backgroundColor: 'pink',
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        returnKeyType={'search'}
        onPress={(data, details) => {
          handleSelectLocation(data, details);
        }}
      />
      {selectedLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={selectedLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Selected Location"
              pinColor="green"
            />
          )}

          {selectedMarker && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={2}
              strokeColor="blue"
            />
          )}

          {markers.map((marker) => (
            <Marker
              key={marker.place_id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
              pinColor="red"
              onPress={() => handleMarkerPress(marker)}
            />
          ))}

          {markersP.map((marker) => (
            <Marker
              key={marker.place_id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
              pinColor="blue"
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>
      )}
      <Button title="NAVIGATE TO AR" onPress={handleNavigateToAR} />
    </View>
  );
};

export default EatsScreen;
