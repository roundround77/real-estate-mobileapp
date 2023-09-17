import React from "react";
import { SVGS } from "../assets";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const GoBack = () => {
  const navigation = useNavigation();

  const handleBackRoute = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleBackRoute();
        }}
      >
        <Image source={SVGS.Back_Arrow} />
      </TouchableOpacity>
    </View>
  );
};

export default GoBack;

const styles = StyleSheet.create({});
