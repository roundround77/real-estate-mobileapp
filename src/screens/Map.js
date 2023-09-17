import React from "react";
import { SVGS } from "../assets";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Map = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={ PROVIDER_GOOGLE }
        mapType="terrain"
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
