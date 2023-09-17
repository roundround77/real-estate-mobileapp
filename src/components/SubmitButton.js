import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicatorBase, ActivityIndicator } from "react-native";

const SubmitButton = ({ title, onPress, loading=false }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DDFE71",
    height: 34,
    width: 155,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#070707",
    fontSize: 16,
    fontWeight: "600",
  },
});
