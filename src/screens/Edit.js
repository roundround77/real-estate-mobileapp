import * as yup from "yup";
import React, { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import * as ImagePicker from "expo-image-picker";
import { getHeight, getWidth } from "../helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { SubmitButton, Input, DropDown, SelectImage } from "../components";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 
import app from "../../firebaseConfig";
import { connect } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";

// Define the validation schema using yup
const schema = yup.object({
  // Define validation rules for your form fields here
  propertyName: yup.string(),
  address: yup.string(),
  price: yup.string(),
  addFacilities: yup.string(),
  description: yup.string(),
  property: yup.string(),
  selectValue: yup.string(),
  rooms: yup.string(),
  restRooms: yup.string(),
  area: yup.string(),
});

const Edit = (props) => {
  const [showDropDown, setShowDropDown] = useState(null);
  const [image, setImage] = useState(null);
  const [mainData, setMainData] = useState({});
  const [loading, setloading] = useState(false);

  // Define arrays for dropdown options
  const PropertyType = ["Home", "Apartment", "Condos"];
  const SelectValue = ["A", "B", "C"];
  const Rooms = [1, 2, 3, 4, 5];
  const RestRooms = [1, 2, 3, 4, 5];
  const Area = [100, 200, 300, 400, 500];

  useEffect(() => {
    // Load data for editing when the component mounts
    loadSingleData(props?.route?.params?.id);
  }, []);

  const loadSingleData = async (id) => {
    // Load data for a single property from Firestore
    const docRef = doc(getFirestore(app), "Property", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMainData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const imageTitle = (data) => {
    // Extract the file name from a URL
    let url = data;
    const parts = url.split('/');
    const fileNameWithExt = parts[parts.length - 1];
    return fileNameWithExt;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // Configure the form validation using yup
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Upload image to Firebase Storage and update Firestore with property data
    // ...

    // Reset the form
    // reset();

    // ...
  };

  const pickImage = async () => {
    // Launch the image picker to select an image from the device
    // ...

    // Set the selected image URI
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <GoBack />
          <Text style={styles.heading}>Edit</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.gap}>
          {/* Form fields */}
          {/* ... */}
          {/* Submit button */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SubmitButton
              title={"Upload"}
              onPress={handleSubmit(onSubmit)}
              active
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.idReducer.userId,
  };
};

export default connect(mapStateToProps)(Edit);

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
    marginBottom: getHeight(2),
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: getWidth(5),
  },

  gap: {
    flexDirection: "column",
    gap: 20,
  },

  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
});
