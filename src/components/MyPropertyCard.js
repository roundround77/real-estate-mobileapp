import { SVGS } from "../assets";
import Checkbox from "expo-checkbox";
import { getHeight, getWidth } from "../helpers";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MyPropertyCard = ({
  title,
  price,
  description,
  beds,
  restRooms,
  area,
  imageUrl,
  id,
  deleteItem,
  editItem
}) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View>
      <View style={styles.card_container}>
        <View style={styles.slider}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
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
            <Image source={SVGS.Bed_Grey} />
            <Text style={styles.text}>{beds} Beds</Text>
          </View>

          <View style={styles.flex}>
            <Image source={SVGS.Toilet_Grey} />
            <Text style={styles.text}>{restRooms} Restrooms</Text>
          </View>

          <View style={styles.flex}>
            <Image source={SVGS.Area_Grey} />
            <Text style={styles.text}>{area} sqft</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => {editItem(id)}}>
              <Text style={styles.button_text}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => {deleteItem(id)}}>
              <Text style={styles.button_text}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyPropertyCard;

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

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getHeight(1),
  },

  button: {
    backgroundColor: "#0F0F0F",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 20,
  },

  button_text: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },

  checkbox_container: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    backgroundColor: "#ffffff",
    marginVertical: 5,
  },

  checkbox_title: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 10,
    marginLeft: 5,
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
