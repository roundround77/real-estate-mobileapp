// Import the necessary modules and components
import React from "react"; // Import React library
import { SVGS } from "../assets"; // Import SVG assets (if used)
import { Image, StyleSheet, Text, View } from "react-native"; // Import components from React Native
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // Import MapView and PROVIDER_GOOGLE from react-native-maps library

// Define the Map component
const Map = () => {
  return (
    // Render a View component to encapsulate the MapView
    <View style={{ flex: 1 }}>
      {/* Render the MapView component */}
      <MapView
        provider={PROVIDER_GOOGLE} // Use the Google Maps provider
        mapType="terrain" // Set the map type to "terrain"
        style={{ flex: 1 }} // Apply styling to the MapView to occupy the entire screen
      />
    </View>
  );
};

// Export the Map component as the default export of this module
export default Map;

// Define an empty stylesheet (styles can be added as needed)
const styles = StyleSheet.create({});
