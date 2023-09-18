import * as yup from "yup";
import React, { useState } from "react";
import GoBack from "../../components/GoBack";
import * as ImagePicker from "expo-image-picker";  // Import image picker from Expo
import { getHeight, getWidth } from "../../helpers";  // Import helper functions for dimensions
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { SubmitButton, Input, DropDown, SelectImage } from "../../components";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";  // Import Firestore functions
import app from "../../../firebaseConfig"; // Import the Firebase app you configured
import { showMessage } from "react-native-flash-message";  // Import flash message library for notifications
import { connect, useSelector } from "react-redux";  // Import Redux functions
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";  // Import Firebase Storage functions
import moment from "moment";  // Import Moment.js for date and time handling

const schema = yup.object({
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

const AddList = (props) => {
  const [showDropDown, setShowDropDown] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const PropertyType = ["HDB", "Condos", "Landed"];
  const SelectValue = ["A", "B", "C"];
  const Rooms = [1, 2, 3, 4, 5];
  const RestRooms = [1, 2, 3, 4, 5];
  const Area = [100, 200, 300, 400, 500];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit =async (data) => {
    setloading(true);
    //SETUP FIREBASE STORAGE
    const storage = getStorage();
    const storageRef = ref(storage, `userPropertyImages/${imageTitle(image)}`);
    const img = await fetch(image);
    const bytes = await img.blob();

    //SETUP FIRESTORE
    const docRef = async (url) =>  {
      try {
        await addDoc(collection(getFirestore(app), "Property"), {
          facilities: data?.addFacilities,
          address: data?.address,
          area: data?.area,
          description: data?.description,
          price: data?.price,
          propertyType: data?.property,
          propertyName: data?.propertyName,
          restRooms: data?.restRooms,
          rooms: data?.rooms,
          owner: props.userId,
          favoritesBy: [],
          location: '',
          picture: url,
          time: moment().format(),  // Format the current date and time
        });
        showMessage({
          message: "Property Added Successfully ",
          type: "success",
        });
        setloading(false);
        props.navigation.navigate("Home");
        reset();

      } catch (e) {
        console.log('Error : ', e);
        setloading(false);
        showMessage({
          message: e?.message,
          type: "danger",
        });
      }
    }

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, bytes).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        docRef(url);
    });
    });
  };

  const imageTitle = (data) => {
    let url = data;
    const parts = url.split('/');
    const fileNameWithExt = parts[parts.length - 1];
    return fileNameWithExt;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <GoBack />
          <Text style={styles.heading}>Add</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.gap}>
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title={"Property Name"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="propertyName"
            />
            {errors.email && (
              <Text style={styles.errors}>{errors.email?.message}</Text>
            )}
          </View>

          <View style={{ zIndex: 10 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DropDown
                  showDropDown={showDropDown}
                  setShowDropDown={setShowDropDown}
                  onPress={() => setShowDropDown("Property Type")}
                  title={"Property Type"}
                  dropdownValue={PropertyType}
                  form
                  onChange={onChange}
                />
              )}
              name="property"
            />
            {errors.property && (
              <Text style={styles.errors}>{errors.property?.message}</Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title={"Address"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="address"
            />
            {errors.address && (
              <Text style={styles.errors}>{errors.address?.message}</Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title={"Price"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  number
                />
              )}
              name="price"
            />
            {errors.price && (
              <Text style={styles.errors}>{errors.price?.message}</Text>
            )}
          </View>

          <View style={styles.flex}>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    onPress={() => setShowDropDown("Rooms")}
                    title={"Rooms"}
                    dropdownValue={Rooms}
                    form
                    onChange={onChange}
                  />
                )}
                name="rooms"
              />
              {errors.rooms && (
                <Text style={styles.errors}>{errors.rooms?.message}</Text>
              )}
            </View>

            <View style={styles.z_Index}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    onPress={() => setShowDropDown("RestRooms")}
                    title={"RestRooms"}
                    dropdownValue={RestRooms}
                    form
                    onChange={onChange}
                  />
                )}
                name="restRooms"
              />
              {errors.restRooms && (
                <Text style={styles.errors}>{errors.restRooms?.message}</Text>
              )}
            </View>

            <View style={styles.z_Index}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    onPress={() => setShowDropDown("Area")}
                    title={"Area"}
                    dropdownValue={Area}
                    form
                    onChange={onChange}
                  />
                )}
                name="area"
              />
              {errors.area && (
                <Text style={styles.errors}>{errors.area?.message}</Text>
              )}
            </View>
          </View>

          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title={"Add Facilities"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="addFacilities"
            />
            {errors.addFacilities && (
              <Text style={styles.errors}>{errors.addFacilities?.message}</Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  title={"Description"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                />
              )}
              name="description"
            />
            {errors.description && (
              <Text style={styles.errors}>{errors.description?.message}</Text>
            )}
          </View>

          <View style={styles.flex}>
            <SelectImage uri={image} onPress={pickImage} />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SubmitButton
              loading={loading}
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

export default connect(mapStateToProps)(AddList);

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

  z_Index: {
    zIndex: 10,
  },
});
