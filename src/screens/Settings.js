// Import necessary modules and components
import React, { useEffect, useState } from "react"; // Import React library and hooks
import * as yup from "yup"; // Import yup for schema validation
import GoBack from "../components/GoBack"; // Import custom "GoBack" component
import { getHeight, getWidth } from "../helpers"; // Import helper functions for responsive design
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver for form validation
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller from react-hook-form for form handling
import { SubmitButton, Input, PasswordInput } from "../components/index"; // Import custom form input components
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"; // Import components and styles from React Native
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"; // Import Firestore functions
import app from "../../firebaseConfig"; // Import Firebase configuration
import { connect } from "react-redux"; // Import connect from Redux for state management
import { showMessage } from "react-native-flash-message"; // Import showMessage for displaying messages

// Define the schema for form validation using yup
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

// Define the Settings component
const Settings = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Use the yup schema resolver for form validation
  });
  const { userId } = props; // Extract the userId from Redux state
  const [accountData, setAccountData] = useState({}); // State to store user account data
  const [docId, setDocId] = useState(''); // State to store the document ID in Firestore
  const [loading, setLoading] = useState(false); // State to manage loading state during form submission

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true during form submission
    try {
      // Update user data in Firestore
      const docRef = await setDoc(
        doc(getFirestore(app), "User", docId), // Reference to the Firestore document
        {
          userId: userId, // User ID
          password: data?.password || accountData?.password, // Password (or existing password)
          name: data?.name || accountData?.name, // Name (or existing name)
          address: data?.address || accountData?.address, // Address (or existing address)
          contactNumber: data?.contact || accountData?.contactNumber, // Contact number (or existing contact number)
          email: accountData?.email, // Email (unchanged)
        },
        { merge: true } // Merge the new data with existing data
      );
      console.log('DOCREF :', docRef);
      // Show a success message
      showMessage({
        message: "Edit successful",
        type: "success",
        style: { marginTop: 50 },
      });
      setLoading(false); // Set loading to false after form submission
    } catch (e) {
      console.log('error : ', e);
      // Show an error message
      showMessage({
        message: error?.message,
        type: "danger",
        style: { marginTop: 50 },
      });
      setLoading(false); // Set loading to false after form submission
    }
    // reset(); // Reset the form (currently commented out)
  };

  // Function to load user account data from Firestore
  const loadData = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(app), "User"));
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        setAccountData(doc.data()); // Set user account data
        setDocId(doc?.id); // Set the document ID in Firestore
      }
    });
  }

  useEffect(() => {
    loadData(); // Load user account data when the component mounts
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <GoBack /> {/* "GoBack" component for navigating back */}
            <Text style={styles.main_heading}>Account Settings</Text>
          </View>
          <View style={styles.gap}>
            <View>
              <Text style={styles.heading}>Personal Information</Text>
            </View>

            {/* Controller for the "name" input */}
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

            {/* Controller for the "address" input */}
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

            {/* Controller for the "contact" input */}
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title={"Enter Contact"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    number // Indicates it's a number input
                    defaultValue={accountData?.contactNumber || ''}
                  />
                )}
                name="contact"
              />
            </View>

            <View>
              <Text style={styles.heading}>Account Settings</Text>
            </View>

            {/* Controller for the "password" input */}
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    title={"Password"}
                    password // Indicates it's a password input
                  />
                )}
                name="password"
              />
            </View>
            {errors.password && (
              <Text style={styles.errors}>{errors.password?.message}</Text>
            )}

            {/* Controller for the "confirmPassword" input */}
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
              <SubmitButton title={"Update"} onPress={handleSubmit(onSubmit)} loading={loading} /> {/* Submit button */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// mapStateToProps function to map Redux state to component props
const mapStateToProps = (state) => {
  return {
    userId: state.idReducer.userId, // Map the userId from Redux state
  };
};

export default connect(mapStateToProps)(Settings); // Export the Settings component connected to Redux

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

  errors: {
    color: "#ffffff",
    marginLeft: getWidth(5),
  },
});
