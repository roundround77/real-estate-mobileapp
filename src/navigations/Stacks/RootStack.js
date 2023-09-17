import React from "react";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

const RootStack = () => {
  const { isLogin } = useSelector((state) => state.user);
  return (
    <NavigationContainer>
      {/* {isLogin?(

        <UserStack />  
      ):(

      <AuthStack />
      )}  */}
      <UserStack />
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
};

export default RootStack;
