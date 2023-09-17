import React from "react";
import BottomTab from "../BottomTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Details,
  Edit,
  Favorites,
  List,
  Chat,
  Notifications,
  Settings,
  SingleChat,
} from "../../screens";
import { Login, SignUp } from "../../screens";

const UserStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />

      <Stack.Group>
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Listing" component={List} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="SingleChat" component={SingleChat} />
        <Stack.Screen name="AccountSettings" component={Settings} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default UserStack;
