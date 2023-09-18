// Import necessary modules and components
import React from "react"; // Import React library
import GoBack from "../components/GoBack"; // Import custom "GoBack" component
import { getHeight, getWidth } from "../helpers"; // Import helper functions for responsive design
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native"; // Import components and styles from React Native
import { Notifications_Data } from "../helpers/mock"; // Import mock data for notifications

// Define the Notifications component
const Notifications = () => {
  // Define a functional component called "Item" to render each notification item
  const Item = ({ title }) => {
    return (
      <>
        {/* Render each notification item within a border */}
        <View style={styles.border}>
          {/* Display the notification title */}
          <Text style={styles.text}>{title}</Text>
          {/* Create a "View" button within a TouchableOpacity for future functionality */}
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
        {/* Header section containing a "GoBack" component and a heading */}
        <View style={styles.header}>
          <GoBack /> {/* "GoBack" component for navigating back */}
          <Text style={styles.heading}>Notifications</Text> {/* Heading text */}
        </View>
        <View>
          {/* FlatList to display the list of notifications */}
          <FlatList
            data={Notifications_Data} // Data source (notification items)
            renderItem={({ item }) => <Item title={item.title} />} // Render each item using the "Item" component
            keyExtractor={(item) => item.id} // Unique key extractor for each notification
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications; // Export the Notifications component as the default export

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
