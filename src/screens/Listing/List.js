import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GoBack from "../../components/GoBack";
import { My_Property } from "../../helpers/mock";  // Import mock data (not used in the code)
import { MyPropertyCard } from "../../components";  // Import custom property card component
import { getHeight, getWidth } from "../../helpers";  // Import helper functions for dimensions
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";  // Import Firestore functions
import { connect } from "react-redux";  // Import Redux functions
import app from "../../../firebaseConfig";  // Import the Firebase app you configured

const List = (props) => {
  const [mainData, setMainData] = useState([]);
  const [secondaryData, setSecondaryData] = useState([]);

  const Item = ({ title, price, description, beds, restRooms, area, imageUrl, id, deleteItem, editItem }) => {
    return (
      <MyPropertyCard
        title={title}
        price={price}
        description={description}
        beds={beds}
        restRooms={restRooms}
        area={area}
        imageUrl={imageUrl}
        id={id}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    );
  };

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(app), "Property"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().owner === props.userId) {
        let res = { ...doc.data() };
        res.id = doc.id;
        tempData.push(res);
      }
    });
    setMainData(tempData);
    setSecondaryData(tempData);
  }

  const deleteItem = async (id) => {
    let arr = [...mainData];
    // Delete Locally
    const index = arr.findIndex(obj => obj.id === id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    setMainData(arr);
    // Delete data on Database
    await deleteDoc(doc(getFirestore(app), "Property", id));
  }

  const editItem = (id) => {
    props.navigation.navigate('Edit', { id })
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <GoBack />
          <Text style={styles.main_heading}>My Listings</Text>
        </View>

        <View>
          <FlatList
            data={mainData}
            numColumns={2}
            columnWrapperStyle={{
              width: getWidth(95),
              marginTop: 10,
            }}
            keyExtractor={(item) => item?.time}
            renderItem={({ item }) => (
              <Item
                title={item?.propertyType}
                price={item?.price}
                description={item?.description}
                beds={item?.restRooms}
                restRooms={item?.restRooms}
                area={item?.area}
                imageUrl={item?.picture}
                id={item?.id}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.idReducer.userId,
  };
};

export default connect(mapStateToProps)(List);

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
