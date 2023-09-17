import React from "react";
import { getHeight, getWidth } from "../helpers";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ title, onChangeText, value, onBlur, number, multiline, defaultValue }) => {
  return (
    <View style={styles.input_container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.text_input}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={number ? "numeric" : "default"}
        multiline={multiline && multiline}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input_container: {
    height: getHeight(6),
    backgroundColor: "#262626",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  title: {
    fontSize: 14,
    color: "#ffffff",
  },

  text_input: {
    width: getWidth(50),
    color: "#ffffff",
    marginLeft: 10,
  },
});
