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

const Edit = (props) => {
  const [showDropDown, setShowDropDown] = useState(null);
  const [image, setImage] = useState(null);
  const [mainData, setMainData] = useState({});
  const [loading, setloading] = useState(false);

  const PropertyType = ["Home", "Apartment", "Conodos"];
  const SelectValue = ["A", "B", "C"];
  const Rooms = [1, 2, 3, 4, 5];
  const RestRooms = [1, 2, 3, 4, 5];
  const Area = [100, 200, 300, 400, 500];

  useEffect(() => {
    loadSingleData(props?.route?.params?.id)
  }, [])

  const loadSingleData = async (id) => {
    const docRef = doc(getFirestore(app), "Property", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMainData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const imageTitle = (data) => {
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
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    //SETUP FIREBASE STORAGE
    const storage = getStorage();
    const storageRef = ref(storage, `userPropertyImages/${imageTitle(image)}`);
    const img = await fetch(image);
    const bytes = await img.blob();
    // reset();

    //SETUP FIRESTORE
    const docRef = async (url) =>  {
      try {
        await setDoc(doc(getFirestore(app), "Property", props?.route?.params?.id), {
          facilities: data?.addFacilities || mainData.facilities,
          address: data?.address || mainData.address,
          area: data?.area || mainData?.area,
          description: data?.description || mainData?.description,
          price: data?.price || mainData?.price,
          propertyType: data?.property || mainData?.propertyType,
          propertyName: data?.propertyName || mainData?.propertyName,
          restRooms: data?.restRooms || mainData?.restRooms,
          rooms: data?.rooms || mainData?.rooms,
          owner: props.userId,
          favoritesBy: [],
          location: '',
          picture: url,
          time: moment().format(),
        }, {merge: true});
        showMessage({
          message: "Property Edited SuccessFully ",
          type: "success",
        });
        setloading(false);
        reset();
        props.navigation.navigate("BottomTab");
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
          <Text style={styles.heading}>Edit</Text>
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
                  defaultValue={mainData.propertyName}
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
                  title={mainData?.propertyType}
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
                  defaultValue={mainData.address}
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
                  defaultValue={mainData.price}
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
                    title={mainData.rooms}
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

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    onPress={() => setShowDropDown("RestRooms")}
                    title={mainData?.restRooms}
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

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDown
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    onPress={() => setShowDropDown("Area")}
                    title={mainData?.area}
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
                  defaultValue={mainData.facilities}
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
                  defaultValue={mainData.description}
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
            {/* <SelectImage uri={image} onPress={pickImage} /> */}
            {/* <SelectImage uri={image} onPress={pickImage} addMore /> */}
          </View>

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
