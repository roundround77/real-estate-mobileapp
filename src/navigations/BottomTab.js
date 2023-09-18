import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddList, Chat, Home, Map, Profile } from "../screens"; // Import various screen components
import HomeIcon from "../assets/SVGS/HomeIcon"; // Import HomeIcon component
import MapIcon from "../assets/SVGS/MapIcon"; // Import MapIcon component
import AddIcon from "../assets/SVGS/AddIcon"; // Import AddIcon component
import ChatIcon from "../assets/SVGS/ChatIcon"; // Import ChatIcon component
import ProfileIcon from "../assets/SVGS/ProfileIcon"; // Import ProfileIcon component

const Tab = createBottomTabNavigator(); // Create a bottom tab navigator

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#DDFE71", // Active tab label color
        tabBarInactiveTintColor: "#ABABAB", // Inactive tab label color
        headerShown: false, // Hide the header for all screens in this navigator
        tabBarLabelStyle: {
          fontSize: 12, // Tab label font size
        },
        tabBarStyle: {
          backgroundColor: "#262626", // Tab bar background color
          position: "absolute", // Position the tab bar
        },
      }}
    >
      {/* Define each tab screen with its name, component, label, and icon */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home", // Tab label text
          tabBarIcon: ({ focused }) => <HomeIcon active={focused} />, // Tab icon component
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Nearby", // Tab label text
          tabBarIcon: ({ focused }) => <MapIcon active={focused} />, // Tab icon component
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddList}
        options={{
          tabBarLabel: "Add", // Tab label text
          tabBarIcon: ({ focused }) => <AddIcon active={focused} />, // Tab icon component
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat", // Tab label text
          tabBarIcon: ({ focused }) => <ChatIcon active={focused} />, // Tab icon component
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile", // Tab label text
          tabBarIcon: ({ focused }) => <ProfileIcon active={focused} />, // Tab icon component
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
