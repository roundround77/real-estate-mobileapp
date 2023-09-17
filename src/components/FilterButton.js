import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../helpers";
import { SVGS } from "../assets";

const FilterButton = () => {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        <Image source={SVGS.Filter} />
        <Text style={styles.filter}>Filters</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DDFE71",
    paddingVertical: getHeight(1),
    borderRadius: 5,
    width: getWidth(23),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  filter: {
    marginLeft: 5,
  },
});
