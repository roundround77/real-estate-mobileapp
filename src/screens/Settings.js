import React, { useEffect, useState } from "react";
import * as yup from "yup";
import GoBack from "../components/GoBack";
import { getHeight, getWidth } from "../helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { SubmitButton, Input, PasswordInput } from "../components/index";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 
import app from "../../firebaseConfig";
import { connect } from "react-redux";
import { showMessage } from "react-native-flash-message";

const schema = yup.object({
  name: yup.string(),
  address: yup.string(),
  contact: yup.string(),
  password: yup
    .string()
    .max(8, "Maximum 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not match"),
});

const Settings = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {userId} = props;
  const [accountData, setAccountData] = useState({});
  const [docId, setDocId] = useState('');
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    setLoading(true);
    try{
      const docRef = await setDoc(doc(getFirestore(app), "User", docId), {
        userId: userId,
        password: data?.password || accountData?.password,
        name: data?.name || accountData?.name,
        address: data?.address || accountData?.address,
        contactNumber: data?.contact || accountData?.contactNumber,
        email: accountData?.email,
      }, {merge: true})
      console.log('DOCREF :', docRef);
      showMessage({
        message: "Edit successfull",
        type: "success",
        style: {marginTop: 50},
     });
      setLoading(false);
    } catch (e) {
      console.log('error : ', e);
      showMessage({
        message: error?.message,
        type: "danger",
        style: {marginTop: 50},
      });
      setLoading(false);
    }
    // reset();
  };

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(app), "User"));
    querySnapshot.forEach((doc) => {
      if(doc.data().userId === userId){
        setAccountData(doc.data());
        setDocId(doc?.id);
      }
    });
  }

  useEffect(() => {
    loadData();
  } ,[])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <GoBack />
            <Text style={styles.main_heading}>Account Settings</Text>
          </View>
          <View style={styles.gap}>
            <View>
              <Text style={styles.heading}>Personal Information</Text>
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title={"Enter Name"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    defaultValue={accountData?.name || ''}
                  />
                )}
                name="name"
              />
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title={"Enter Address"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    defaultValue={accountData?.address || ''}
                  />
                )}
                name="address"
              />
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title={"Enter Contact"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    number
                    defaultValue={accountData?.contactNumber || ''}
                  />
                )}
                name="contact"
              />
            </View>

            <View>
              <Text style={styles.heading}>Account Setting</Text>
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
            </View>
            {errors.password && (
              <Text style={styles.errors}>{errors.password?.message}</Text>
            )}

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
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errors}>
                {errors.confirmPassword?.message}
              </Text>
            )}

            <View style={styles.flex}>
              <SubmitButton title={"Update"} onPress={handleSubmit(onSubmit)} loading={loading}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// export default Settings;

const mapStateToProps = (state) => {
  return {
    userId: state.idReducer.userId,
  };
};

export default connect(mapStateToProps)(Settings);

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

  main_heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: getWidth(5),
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },

  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  gap: {
    flexDirection: "column",
    gap: 20,
  },

  input_container: {
    flexDirection: "row",
    justifyContent: "center",
  },

  errors: {
    color: "#ffffff",
    marginLeft: getWidth(5),
  },
});
