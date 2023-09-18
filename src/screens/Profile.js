// Import necessary modules and components
import React from "react"; // Import React library
import GoBack from "../components/GoBack"; // Import custom "GoBack" component
import { getHeight, getWidth } from "../helpers"; // Import helper functions for responsive design
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native"; // Import components and styles from React Native
import { SVGS } from "../assets"; // Import SVG assets
import { Profile_Data } from "../helpers/mock"; // Import mock data for the user's profile
import { logOut } from "../store/UserSlice"; // Import logout action from Redux store
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux

// Define the Profile component
const Profile = ({ navigation }) => {
  const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch Redux actions

  // Define a functional component called "Item" to render each profile item
  const Item = ({ title, route }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route); // Navigate to the specified route when an item is pressed
          }}
        >
          <View style={styles.border}>
            <Text style={styles.text}>{title}</Text> {/* Display the item title */}
            <Image source={SVGS.Arrow_Right} /> {/* Display a right arrow icon */}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header section containing a "GoBack" component and a heading */}
        <View style={styles.header}>
          <GoBack /> {/* "GoBack" component for navigating back */}
          <Text style={styles.heading}>Profile</Text> {/* Heading text */}
        </View>
        <View>
          {/* FlatList to display the list of profile items */}
          <FlatList
            data={Profile_Data} // Data source (profile items)
            renderItem={({ item }) => (
              <Item title={item.title} route={item.route} /> // Render each item using the "Item" component
            )}
            keyExtractor={(item) => item.id} // Unique key extractor for each profile item
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(logOut()); // Dispatch the logout action to log the user out
              navigation.navigate("Login"); // Navigate to the login screen after logging out
            }}
          >
            <View style={styles.border}>
              <Text style={styles.text}>Logout</Text> {/* Display "Logout" text */}
              <Image source={SVGS.Arrow_Right} /> {/* Display a right arrow icon */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile; // Export the Profile component as the default export

// Define styles using StyleSheet.create
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
