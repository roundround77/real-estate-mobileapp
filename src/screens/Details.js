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
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <GoBack />
            <Text style={styles.heading}>Details</Text>
          </View>
          <View>
            <Image source={{uri: route.params?.imageUrl}} style={styles.image} />
          </View>

          <View style={styles.top_bar}>
            <View style={styles.flex}>
              <Text style={styles.large_text}>{route.params?.title}</Text>
              <Text style={styles.mini_text}>{moment(route.params?.time).startOf('hour').fromNow()}</Text>
            </View>
            <View>
              <Image source={SVGS.Favorite} />
            </View>
          </View>
          <Text style={styles.address}>
            Street: {route.params?.address}
          </Text>

          <View style={styles.structure}>
            <View style={styles.flex}>
              <Image source={SVGS.Bed} />
              <Text style={styles.mini_text}>{route.params?.beds} Beds</Text>
            </View>

            <View style={styles.flex}>
              <Image source={SVGS.Toilet} />
              <Text style={styles.mini_text}>{route.params?.restRooms} Restrooms</Text>
            </View>

            <View style={styles.flex}>
              <Image source={SVGS.Area} />
              <Text style={styles.mini_text}>{route.params?.area} sqft</Text>
            </View>
          </View>

          <View style={{ marginVertical: getHeight(2) }}>
            <Text style={styles.large_text}>$ {route.params?.price}</Text>
          </View>

          <View>
            <Text style={styles.large_text}>Description:</Text>
          </View>

          <View>
            <Text style={styles.details}>
              {route.params?.description}
            </Text>
          </View>

          <View style={{ marginTop: getHeight(2) }}>
            <Text style={styles.large_text}>Facilities:</Text>
            <Text style={styles.details}>{route.params?.facilities}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.large_text}>Location:</Text>
          <View style={styles.flex}>
            <MapView mapType="terrain" style={styles.map} />
          </View>
        </View>

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

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: getWidth(4),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getHeight(3),
  },

  top_bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getHeight(2),
  },

  large_text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginRight: 5,
  },

  mini_text: {
    fontWeight: "500",
    fontSize: 10,
    color: "#ffffff",
    marginLeft: 5,
  },

  address: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 12,
    maxWidth: getWidth(70),
  },

  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  structure: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: getHeight(2),
    gap: 8,
  },

  details: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
    marginVertical: getHeight(0.5),
  },

  image: {
    backgroundColor: "red",
    width: getWidth(95),
    height: getHeight(20),
    borderRadius: 10,
    objectFit: "cover",
    resizeMode: "center",
  },

  map: {
    width: getWidth(85),
    height: getHeight(20),
    marginVertical: 5,
  },
});
