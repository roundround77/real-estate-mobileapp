import React, { useCallback, useEffect, useState } from 'react';
import GoBack from "../../components/GoBack";
import { getHeight, getWidth } from "../../helpers";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GiftedChat } from 'react-native-gifted-chat';
import { getDatabase, get, ref, onValue, off, update } from 'firebase/database';

const SingleChat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { selectedUser, myData} = route.params;

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();
      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      off(chatroomRef);
    };
  }, []);

  const renderMessages = useCallback(
    msgs => {
      return msgs
        ? msgs.reverse().map((msg, index) => ({
          ...msg,
          _id: index,
          user: {
            _id:
              msg.sender === myData.username
                ? myData.username
                : selectedUser.username,
            avatar:
              msg.sender === myData.username
                ? myData.avatar
                : selectedUser.avatar,
            name:
              msg.sender === myData.username
                ? myData.username
                : selectedUser.username,
          },
        }))
        : [];
    },
    [
      myData.avatar,
      myData.username,
      selectedUser.avatar,
      selectedUser.username,
    ],
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();
    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    );
    return snapshot.val();
  }, []);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: myData.username,
            createdAt: new Date(),
          },
        ],
      });

      setMessages(prevMessages => GiftedChat.append(prevMessages, msg));
    },
    [],
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        {/* <Image
          style={styles.image}
          source={{ uri: selectedUser.avatar }}
        /> */}
        <View style={styles.header2}>
          <Text style={styles.heading}>{selectedUser.username}</Text>
          <Text style={styles.heading2}>{selectedUser.username}</Text>
        </View>

      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: myData.username,
        }}
      />
    </SafeAreaView>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
    paddingVertical: getHeight(3),
    paddingHorizontal: getWidth(6),
  },

  image: {
    height: 40,
    width: 40,
    borderRadius: 6,
    marginLeft: getWidth(3),
  },

  header2: {
    flexDirection: "column",
    marginLeft: getWidth(3),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },

  heading2: {
    fontSize: 15,
    color: "#ffffff",
  },
});
