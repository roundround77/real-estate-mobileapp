import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { getHeight, getWidth } from "../helpers";
import { Property_Data } from "../helpers/mock";
import { PropertyCard } from "../components";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 
import app from "../../firebaseConfig";

const Favorites = (navigation) => {
  const [mainData, setMainData] = useState([]);
  const [secondaryData, setSecondaryData] = useState([]);
  const Item = ({ title, price, description, beds, restRooms, area, time, imageUrl, facilities, address}) => {
    return (
      <PropertyCard
      title={title}
      price={price}
      description={description}
      beds={beds}
      restRooms={restRooms}
      area={area}
      time={time}
      navigation={navigation}
      imageUrl={imageUrl}
      facilities={facilities}
      address={address}
      />
    );
  };

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(app), "Property"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      if(doc.data().time){
        tempData.push(doc.data())
      }
    });
    setMainData(tempData);
    setSecondaryData(tempData);
  }

  useEffect(() => {
    loadData();
  } ,[])

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
        <View style={styles.header}>
          <GoBack />
          <Text style={styles.main_heading}>Favorites</Text>
        </View>

        <View>
          <FlatList
            data={mainData}
            numColumns={2}
            columnWrapperStyle={{
              width: getWidth(95),
              marginTop: 10,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
              title={item?.propertyType}
              price={item?.price}
              description={item?.description}
              beds={item?.restRooms}
              restRooms={item?.restRooms}
              area={item?.area}
              time={item?.time}
              imageUrl={item?.picture}
              facilities={item?.facilities}
              address={item?.address}
              />
            )}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(2),
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
});
