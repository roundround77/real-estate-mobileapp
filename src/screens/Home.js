import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Property_Data } from "../helpers/mock";
import { getHeight, getWidth } from "../helpers";
import { DropDown, FilterButton, PropertyCard } from "../components";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "../../firebaseConfig";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [selected, setSelected] = useState("Apartment");
  const [showDropDown, setShowDropDown] = useState(null);
  const [mainData, setMainData] = useState([]);
  const [secondaryData, setSecondaryData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const isFocused = useIsFocused();



  const SortValues = ["Price (Low - High)", "Price(High - Low)", "Name (Asc)", "Name(Dsc)"];
  const PropertyType = [
    "HDB",
    "Condos",
    "Landed",
  ];

  const Item = ({ userid, title, price, description, beds, restRooms, area, time, imageUrl, facilities, address }) => {
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
        userid={userid}
      />
      // <>
      // <Text style={{color:'#fff'}}>
      //   {title}
      // </Text>
      // </>
    );
  };

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(app), "Property"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().time) {
        tempData.push(doc.data())
      }
    });
    setMainData(tempData);
    setSecondaryData(tempData);
  }

  const searchFilter = () => {
    let temp = [...secondaryData];
    // Use the filter method to create a new array containing matching objects
    const filteredObjects = temp.filter(obj => obj.propertyType.toLowerCase().includes(searchInput.toLowerCase()));
    setMainData(filteredObjects);
  }

  function orderObjectsByTitleAscending(temp) {
    return temp.sort((a, b) => {
      const titleA = a.propertyType.toLowerCase();
      const titleB = b.propertyType.toLowerCase();

      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  function orderObjectsByTitleDescending(temp) {
    return temp.sort((a, b) => {
      const titleA = a.propertyType.toLowerCase();
      const titleB = b.propertyType.toLowerCase();

      if (titleA > titleB) return -1;
      if (titleA < titleB) return 1;
      return 0;
    });
  }

  const changedDropdown = (e) => {
    let temp = [...secondaryData];
    if (e === 'Price (Low - High)') {
      temp = temp.sort((a, b) => a.price - b.price);
    } else if (e === 'Price(High - Low)') {
      temp = temp.sort((a, b) => b.price - a.price);
    } else if (e === 'Name (Asc)') {
      temp = orderObjectsByTitleAscending(temp);
    } else if (e === 'Name(Dsc)') {
      temp = orderObjectsByTitleDescending(temp);
    } else if (e === 'HDB' || e === 'Condos' || e === 'Landed') {
      temp = temp.filter(obj => obj.propertyType.toLowerCase().includes(e.toLowerCase()));
    }

    setMainData(temp);
  }

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.serach_container}>
          <View>
            <TextInput
              style={styles.search_box}
              placeholder="Search"
              placeholderTextColor="#ffffff"
              onEndEditing={() => searchFilter()}
              onChangeText={(val) => setSearchInput(val)}
            />
          </View>
        </View>

        <View style={styles.filters}>
          <FilterButton />
          <DropDown
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            onPress={() => setShowDropDown("Sort By")}
            title={"Sort By"}
            dropdownValue={SortValues}
            callAction={changedDropdown}
          />

          <DropDown
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            onPress={() => setShowDropDown("Property Type")}
            title={"Property Type"}
            dropdownValue={PropertyType}
            callAction={changedDropdown}
          />
        </View>
        <View>
          <Text style={styles.heading}>{selected}</Text>
        </View>

        <FlatList
          data={mainData}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: getHeight(23) }}
          columnWrapperStyle={{
            width: getWidth(95),
            marginTop: 10,
          }}
          keyExtractor={(item) => item.time}
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
              userid={item?.owner}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(2),
  },

  serach_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    marginBottom: getHeight(2),
  },

  search_box: {
    backgroundColor: "#262626",
    width: getWidth(93),
    color: "#ffffff",
    borderRadius: 10,
    paddingVertical: getHeight(1.3),
    paddingHorizontal: getWidth(1.5),
    fontSize: 14,
    fontWeight: "500",
    // width: '100%',
    // height: getHeight(8)
  },

  buttons: {
    flexDirection: "row",
    gap: 5,
    marginVertical: getHeight(2),
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },

  filters: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
    alignItems: "center",
    zIndex: 2,
  },
});
