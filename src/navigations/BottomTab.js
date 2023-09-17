import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddList, Chat, Home, Map, Profile } from "../screens";
import HomeIcon from "../assets/SVGS/HomeIcon";
import MapIcon from "../assets/SVGS/MapIcon";
import AddIcon from "../assets/SVGS/AddIcon";
import ChatIcon from "../assets/SVGS/ChatIcon";
import ProfileIcon from "../assets/SVGS/ProfileIcon";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#DDFE71",
        tabBarInactiveTintColor: "#ABABAB",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "#262626",
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <HomeIcon active={focused} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Nearby",
          tabBarIcon: ({ focused }) => <MapIcon active={focused} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddList}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ focused }) => <AddIcon active={focused} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => <ChatIcon active={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => <ProfileIcon active={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
