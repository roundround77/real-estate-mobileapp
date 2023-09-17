import React from "react";
import { SVGS } from "../assets";
import { getWidth } from "../helpers";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ selected, title, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: selected === title ? "#DDFE71" : "#262626" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.title,
          { color: selected === title ? "#000000" : "#ffffff" },
        ]}
      >
        {title}
      </Text>
      {selected === title && (
        <>
          <Image style={styles.cross_icon} source={SVGS.Cross_Icon} />
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: getWidth(4),
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  cross_icon: {
    marginLeft: 6,
    marginTop: 2,
  },
});
