import React from "react";
import GoBack from "../components/GoBack";
import { getHeight, getWidth } from "../helpers";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Notifications_Data } from "../helpers/mock";

const Notifications = () => {
  const Item = ({ title }) => {
    return (
      <>
        <View style={styles.border}>
          <Text style={styles.text}>{title}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.view}>View</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <GoBack />
          <Text style={styles.heading}>Notifications</Text>
        </View>
        <View>
          <FlatList
            data={Notifications_Data}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(6),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: getWidth(5),
  },

  border: {
    borderBottomColor: "#262626",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    maxWidth: getWidth(75),
  },

  view: {
    color: "#DDFE71",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
