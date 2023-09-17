import React, { useState } from "react";
import * as yup from "yup";
import { getHeight } from "../../helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { SubmitButton, Input, PasswordInput } from "../../components";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebaseConfig"; // Import the Firebase app you configured
import { showMessage } from "react-native-flash-message";
import { connect, useDispatch } from "react-redux";
import { login } from "../../store/UserSlice";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup
    .string()
    .max(8, "Maximum 8 characters")
    .required("Password is required"),
});

const Login = (props) => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setloading(true);
    const { email, password } = data;
    try {

      const res = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const user = res.user;
      dispatch(login({
        id: user.uid,
        email: user.email
      }))
      props.userData(user?.uid);
      props.navigation.navigate('BottomTab');
      setloading(false);
      showMessage({
        message: "Login successfull ",
        type: "success",
      });

    } catch (error) {
      showMessage({
        message: error?.message,
        type: "danger",
      });
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>MyPropertyApp</Text>
      </View>

      <Text style={styles.singup}>Login</Text>

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

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <SubmitButton
            loading={loading}
            title={"Login"}
            onPress={handleSubmit(onSubmit)}
            active
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={styles.account}>Don’t have an account? Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default connect(null, setUserData)(Login);

var sendUserData = function (userId) {
  return {
    type: 'setUserId',
    userId,
  };
};

function setUserData(dispatch) {
  return {
    userData: (userId) => dispatch(sendUserData(userId)),
  };
}

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

  errors: {
    color: "#ffffff",
  },

  gap: {
    flexDirection: "column",
    gap: 20,
  },
});
