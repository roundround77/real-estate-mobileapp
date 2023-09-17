import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CardButton = ({ active, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: active ? "#DDFE71" : "#ABABAB" },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: active ? "#070707" : "#ffffff" }]}>
        Contact Seller
      </Text>
    </TouchableOpacity>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  title: {
    color: "#",
    fontSize: 14,
    fontWeight: "600",
  },
});
