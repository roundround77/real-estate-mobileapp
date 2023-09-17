import { SVGS } from "../assets";
import CardButton from "./CardButton";
import React, { useState } from "react";
import { getHeight, getWidth } from "../helpers";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";

const PropertyCard = ({
  userid,
  title,
  price,
  description,
  beds,
  restRooms,
  area,
  time,
  navigation,
  imageUrl,
  facilities,
  address,
}) => {
  const [favorite, setFavorite] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", {
          title,
          price,
          description,
          beds,
          restRooms,
          area,
          time,
          navigation,
          imageUrl,
          facilities,
          address,
        });
      }}
      activeOpacity={0.9}
    >
      <View style={styles.card_container}>
        <View style={styles.slider}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.card_header}>
          <View style={styles.transparent}>
            <Text>{moment(time).startOf('hour').fromNow()}</Text>
          </View>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <Image source={favorite ? SVGS.Favorite : SVGS.Favorite_Active} />
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={styles.price}>{`$ ${price}`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.details}>{description}</Text>
        </View>

        <View style={styles.flex}>
          <View style={styles.flex}>
            <Image source={SVGS.Bed} />
            <Text style={styles.text}>{beds} Beds</Text>
          </View>

          <View style={styles.flex}>
            <Image source={SVGS.Toilet} />
            <Text style={styles.text}>{restRooms} Restrooms</Text>
          </View>

          <View style={styles.flex}>
            <Image source={SVGS.Area} />
            <Text style={styles.text}>{area} sqft {userid}</Text>
          </View>
        </View>

        <View style={styles.button}>
          <CardButton
            active
            onPress={() => {
              navigation.navigate("Chat", { userid: userid });
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  card_container: {
    backgroundColor: "#262626",
    padding: 10,
    margin: getWidth(1),
    width: getWidth(45),
    borderRadius: 10,
  },

  slider: {
    paddingBottom: getHeight(2),
  },

  card_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: getHeight(2),
    left: getWidth(5),
    width: "90%",
  },

  transparent: {
    backgroundColor: "#DCDBDB",
    padding: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },

  price: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },

  details: {
    fontSize: 10,
    fontWeight: "500",
    color: "#ffffff",
    marginVertical: getHeight(1.5),
  },

  text: {
    fontWeight: "500",
    fontSize: 10,
    color: "#ffffff",
    marginLeft: 2,
  },

  button: {
    marginTop: getHeight(1),
  },

  image: {
    width: getWidth(40),
    height: getHeight(15),
    resizeMode: "center",
    backgroundColor: "black",
    objectFit: "cover",
    borderRadius: 5,
  },
});
