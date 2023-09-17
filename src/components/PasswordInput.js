import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SVGS } from "../assets";
import React, { useState } from "react";
import { getHeight, getWidth } from "../helpers";

const PasswordInput = ({ title, password, onChangeText, onBlur, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <View style={styles.input_container}>
        <Text style={styles.title}>{title}</Text>

        <TextInput
          style={[
            styles.text_input,
            { width: password ? getWidth(58) : getWidth(44) },
          ]}
          secureTextEntry={showPassword ? false : true}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          maxLength={8}
        />

        {showPassword ? (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image source={SVGS.Eye_Open} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image source={SVGS.Eye_Close} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  input_container: {
    height: getHeight(6),
    // width: getWidth(80),
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
    color: "#ffffff",
    marginLeft: 10,
  },
});
