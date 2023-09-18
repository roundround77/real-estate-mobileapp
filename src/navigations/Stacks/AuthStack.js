import React from "react";
import { Login, SignUp } from "../../screens"; // Import the Login and SignUp screens
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = () => {
  const Stack = createNativeStackNavigator(); // Create a stack navigator for authentication screens

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all screens in this navigator
      }}
    >
      <Stack.Screen name="Signup" component={SignUp} /> {/* Define the Signup screen */}
      <Stack.Screen name="Login" component={Login} /> {/* Define the Login screen */}
    </Stack.Navigator>
  );
};

export default AuthStack;
