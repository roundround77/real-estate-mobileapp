import React, { useEffect, useState } from "react";
import { AvatarGenerator } from 'random-avatar-generator';
import { getHeight, getWidth } from "../../helpers";
import { useIsFocused } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "../../../firebaseConfig";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { useSelector } from "react-redux";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';
import { async } from "@firebase/util";
const generator = new AvatarGenerator();

const Chat = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  const [myData, setMyData] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const isFocused = useIsFocused();

  const findUser = async name => {
    const database = getDatabase();
    const mySnapshot = await get(ref(database, `users/${name}`));
    return mySnapshot.val();
  };

  const loadData = async () => {
    if (route.params && route.params.userid) {
      checkOrAddNewFriend(route.params.userid)
    } else {
      const myData = await getOrCreatChaiter(user);
      setMyData(myData);
    }
  }

  const displayChat = async (friend) => {
    navigation.navigate("SingleChat", { selectedUser: friend, myData: myData });
  }


  const getOrCreatChaiter = async (user) => {
    const database = getDatabase();
    const myChat = await findUser(user.id);
    console.log(myChat);
    if (!myChat) {
      const newMeObj = {
        _id: user.id,
        username: user.email,
        avatar: generator.generateRandomAvatar(),
        friends: []
      };
      set(ref(database, `users/${user.id}`), newMeObj);
      return newMeObj;
    } else {
      return myChat;
    }
  }


  const getOrCreatChat = async (myData, friend) => {
    const database = getDatabase();
    if (friend._id === myData._id) {
      // don't let friend add himself
      return;
    }

    if (myData.friends && myData.friends.some(frnd => frnd._id === friend._id)) {
      const frenData = myData.friends.find(frnd => { return frnd._id === friend._id });
      setRedirecting(false);
      navigation.navigate("SingleChat", { selectedUser: frenData, myData: myData });
      return;
    }

    // create a chatroom and store the chatroom id
    const newChatroomRef = await push(ref(database, 'chatrooms'), {
      firstUser: myData._id,
      secondUser: friend._id,
      messages: [],
    });

    const newChatroomId = newChatroomRef.key;

    const userFriends = friend.friends || [];
    //join myself to this friend friend list
    await update(ref(database, `users/${friend._id}`), {
      friends: [
        ...userFriends,
        {
          _id: myData._id,
          username: myData.username,
          avatar: myData.avatar,
          chatroomId: newChatroomId,
        },
      ],
    });

    const myFriends = myData.friends || [];
    const myNewFriends = [
      ...myFriends,
      {
        _id: friend._id,
        username: friend.username,
        avatar: friend.avatar,
        chatroomId: newChatroomId,
      },
    ];
    //add this friend to my friend list
    await update(ref(database, `users/${myData._id}`), {
      friends: myNewFriends,
    });

    setMyData(old => ({
      ...old,
      friends: myNewFriends
    }));

    setRedirecting(false);
    navigation.navigate("SingleChat", {
      selectedUser: {
        _id: friend._id,
        username: friend.username,
        avatar: friend.avatar,
        chatroomId: newChatroomId,
      }, myData: myData
    });
  }

  const checkOrAddNewFriend = async (userid) => {
    try {
      setRedirecting(true);
      const querySnapshot = await getDocs(collection(getFirestore(app), "User"));
      var userData = null;
      querySnapshot.forEach((doc) => {
        if (doc.data().userId == userid) {
          userData = doc.data();
        }
      });
      if (userData) {
        const myData = await getOrCreatChaiter(user);
        const friendData = await getOrCreatChaiter({
          id: userData.userId,
          email: userData.email
        });
        await getOrCreatChat(myData, friendData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) { loadData() } else { route.params = null }
  }, [isFocused]);

  useEffect(() => {
    loadData();
  }, [])

  const Item = ({ data }) => {
    return (
      <>
        <TouchableOpacity onPress={() => displayChat(data)}>
          <View style={styles.chat_box}>
            <View style={styles.chat_box1}>
              {/* <Image
                style={styles.image}
                source={{ uri: data.avatar }}
              /> */}
              <View>
                <Text style={styles.title}>{data.username}</Text>
                <Text style={styles.message}>{data._id}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.time}>
                {">"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Chats</Text>
        {
          redirecting ? <Text style={styles.heading}>Creating Chat, Please wait...</Text> :
            myData ?
              myData.friends ?
                <FlatList
                  data={myData.friends}
                  renderItem={({ item }) => (
                    <Item
                      data={item}
                    />

                  )}
                  keyExtractor={(item) => item._id}
                /> : <Text style={styles.heading}>No Chats Found.</Text>
              : <Text style={styles.heading}>Loading...</Text>
        }

      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingHorizontal: getWidth(6),
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: getHeight(7),
  },

  chat_box1: {
    flexDirection: "row",
    alignItems: "center",
  },

  chat_box: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: getHeight(1),
    marginVertical: getHeight(1),
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
  },

  message: {
    color: "#ffffff",
    marginTop: 2,
    fontSize: 12,
  },

  time: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 30,
  },

  image: {
    height: 40,
    width: 40,
    borderRadius: 6,
    marginRight: getWidth(2),
  },

  notification: {
    backgroundColor: "#DDFE71",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: getHeight(2.5),
    width: getWidth(5),
    marginTop: 2,
  },
});
