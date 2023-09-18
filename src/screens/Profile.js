import React from "react";
import GoBack from "../components/GoBack";
import { getHeight, getWidth } from "../helpers";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SVGS } from "../assets";
import { Profile_Data } from "../helpers/mock";
import { logOut } from "../store/UserSlice";
import { useDispatch } from "react-redux";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const Item = ({ title, route }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route);
          }}
        >
          <View style={styles.border}>
            <Text style={styles.text}>{title}</Text>
            <Image source={SVGS.Arrow_Right} />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <GoBack />
          <Text style={styles.heading}>Profile</Text>
        </View>
        <View>
          <FlatList
            data={Profile_Data}
            renderItem={({ item }) => (
              <Item title={item.title} route={item.route} />
            )}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(logOut());
              navigation.navigate("Login")
            }}
          >
            <View style={styles.border}>
              <Text style={styles.text}>Logout</Text>
              <Image source={SVGS.Arrow_Right} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
    marginBottom: getHeight(5),
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
    fontSize: 16,
    fontWeight: "500",
    maxWidth: getWidth(75),
  },
});
