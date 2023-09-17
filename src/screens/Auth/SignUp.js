import React, { useState } from "react";
import * as yup from "yup";
import { getHeight } from "../../helpers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitButton, Input, PasswordInput } from "../../components";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../../firebaseConfig"; // Import the Firebase app you configured
import { showMessage } from "react-native-flash-message";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup
    .string()
    .max(8, "Maximum 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = ({ navigation }) => {
  const [loading,setloading]=useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit =async (data) => {
    setloading(true)
    const {email,password}=data
     
    // navigation.navigate("Home");
  try {
    const res = await createUserWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );
    const user= res?.user;
    const docRef = await addDoc(collection(getFirestore(app), "User"), {
      userId: user?.uid,
      email: email,
      password: password,
      name: '',
      address: '',
      contactNumber: '',
    })
    setloading(false);
    showMessage({
      message: "Sign Up successfull ",
      type: "success",
    });
    reset();
  } catch (error) {
    if(error?.message.includes('Property')){
      showMessage({
        message: "Sign Up successfull ",
        type: "success",
      });
      reset();
    } else {
      showMessage({
        message: error?.message,
        type: "danger",
      });
    }
    setloading(false);
  }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>MyPropertyApp</Text>
      </View>

      <Text style={styles.singup}>Signup</Text>

      <View style={styles.gap}>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                title={"Email"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errors}>{errors.email?.message}</Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                title={"Password"}
                password
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errors}>{errors.password?.message}</Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                title={"Confirm Password"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text style={styles.errors}>{errors.confirmPassword?.message}</Text>
          )}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <SubmitButton
            loading={loading}
            title={"Signup"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.account}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#070707",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: getHeight(5),
  },

  logo: {
    color: "#ffffff",
    marginBottom: getHeight(8),
    fontSize: 40,
  },

  singup: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 34,
    textAlign: "center",
  },

  account: {
    color: "#ffffff",
    textAlign: "center",
  },

  btn_container: {
    backgroundColor: "#DDFE71",
    height: 34,
    width: 155,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#070707",
    fontSize: 16,
    fontWeight: "600",
  },

  gap: {
    flexDirection: "column",
    gap: 20,
  },

  errors: {
    color: "white",
  },
});
