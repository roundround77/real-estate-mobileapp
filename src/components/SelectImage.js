import React from "react";
import { SVGS } from "../assets";
import { getWidth } from "../helpers";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const SelectImage = ({ uri, addMore, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {addMore ? (
          <Image source={uri ? uri : SVGS.Add_More} />
        ) : (
          <Image source={uri ? uri : SVGS.Image} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262626",
    borderRadius: 10,
    padding: getWidth(6),
  },
});
