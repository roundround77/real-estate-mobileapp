import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SVGS } from "../assets";
import MapView from "react-native-maps";
import GoBack from "../components/GoBack";
import { getHeight, getWidth } from "../helpers";
import moment from "moment";

const Details = ({ navigation, route }) => {
  return (
    // Use a ScrollView to allow vertical scrolling when content overflows
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Create the main container */}
      <SafeAreaView style={styles.container}>
        {/* Header section */}
        <View>
          <View style={styles.header}>
            {/* "GoBack" button for navigation */}
            <GoBack />
            {/* Heading */}
            <Text style={styles.heading}>Details</Text>
          </View>
          {/* Property image */}
          <View>
            <Image source={{ uri: route.params?.imageUrl }} style={styles.image} />
          </View>

          {/* Top bar with property title and listing time */}
          <View style={styles.top_bar}>
            {/* Property title */}
            <View style={styles.flex}>
              <Text style={styles.large_text}>{route.params?.title}</Text>
              {/* Time since the property was listed */}
              <Text style={styles.mini_text}>
                {moment(route.params?.time).startOf('hour').fromNow()}
              </Text>
            </View>
            {/* Favorite icon */}
            <View>
              <Image source={SVGS.Favorite} />
            </View>
          </View>
          {/* Property address */}
          <Text style={styles.address}>
            Street: {route.params?.address}
          </Text>

          {/* Property structure (beds, restrooms, area) */}
          <View style={styles.structure}>
            <View style={styles.flex}>
              <Image source={SVGS.Bed} />
              <Text style={styles.mini_text}>{route.params?.beds} Beds</Text>
            </View>

            <View style={styles.flex}>
              <Image source={SVGS.Toilet} />
              <Text style={styles.mini_text}>
                {route.params?.restRooms} Restrooms
              </Text>
            </View>

            <View style={styles.flex}>
              <Image source={SVGS.Area} />
              <Text style={styles.mini_text}>{route.params?.area} sqft</Text>
            </View>
          </View>

          {/* Property price */}
          <View style={{ marginVertical: getHeight(2) }}>
            <Text style={styles.large_text}>$ {route.params?.price}</Text>
          </View>

          {/* Property description */}
          <View>
            <Text style={styles.large_text}>Description:</Text>
          </View>

          {/* Property description text */}
          <View>
            <Text style={styles.details}>
              {route.params?.description}
            </Text>
          </View>

          {/* Facilities available in the property */}
          <View style={{ marginTop: getHeight(2) }}>
            <Text style={styles.large_text}>Facilities:</Text>
            <Text style={styles.details}>{route.params?.facilities}</Text>
          </View>
        </View>

        {/* Location section */}
        <View>
          <Text style={styles.large_text}>Location:</Text>
          <View style={styles.flex}>
            {/* Placeholder map view (replace with actual location data) */}
            <MapView mapType="terrain" style={styles.map} />
          </View>
        </View>

        {/* "Contact Seller" button */}
        <View>
          <TouchableOpacity
            style={styles.flex}
            onPress={() => navigation.navigate("SingleChat")}
          >
            <Text style={styles.large_text}>Contact Seller</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(3),
  },

  // ... (other styles)
});
