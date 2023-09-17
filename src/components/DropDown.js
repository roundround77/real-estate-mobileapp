import { SVGS } from "../assets";
import React, { useState } from "react";
import { getHeight, getWidth } from "../helpers";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DropDown = (props) => {
  const [activeValue, setActiveValue] = useState(null);
  const {showDropDown,
    setShowDropDown,
    onPress,
    title,
    dropdownValue,
    form,
    onChange,} = props;

  const handleSelected = (e) => {
    if (props.callAction) {
      props?.callAction(e);
    }
    setActiveValue(e);
    setShowDropDown(!showDropDown);
    if (form) {
      onChange(e);
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.drop_down}>
            <Text style={styles.title}>
              {activeValue ? activeValue : title}
            </Text>
            <Image
              style={form ? styles.form_icon : styles.icon}
              source={SVGS.Down_Arrow}
            />
          </View>
        </TouchableOpacity>

        {showDropDown === title && (
          <>
            <View style={styles.modal}>
              {dropdownValue.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelected(item)}
                >
                  <Text style={styles.selectedText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  drop_down: {
    backgroundColor: "#262626",
    borderRadius: 5,
    paddingVertical: getHeight(1.2),
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    marginRight: 5,
  },

  icon: {
    marginTop: 5,
  },

  form_icon: {
    height: 12,
    width: 12,
    marginTop: 5,
  },

  modal: {
    backgroundColor: "#ffffff",
    padding: 10,
    position: "absolute",
    top: getHeight(5),
    right: 0,
    zIndex: 10,
    borderRadius: 5,
    width: "100%",
  },
});
