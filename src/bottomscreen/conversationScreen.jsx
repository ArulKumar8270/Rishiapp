import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {loginResponseSelector} from '../redux/selectors/app.selector';
import {
  addMessage,
  loadMessages,
  setMessages,
} from '../redux/actions/messages.actions';
import Icons from 'react-native-vector-icons/Feather';
import {BORDERRADIUS, COLORS, FONTSIZE, SIZES, SPACING} from '../styles/config';
import {fonts} from '../../config';
import ChatHeader from '../componants/ChatHeader';

const ConversationScreen = ({route}) => {
  const {conversationId, companyId, companyName} = route.params || {}; // Get conversation ID and company ID from navigation
  const [newMessage, setNewMessage] = useState(''); // Only handle new message input
  const loginResponse = useSelector(loginResponseSelector);
  const flatListRef = useRef(); // To scroll to the bottom of the list
  const dispatch = useDispatch();

  // Get messages from Redux store

  // Load messages from Firestore on mount
  useEffect(() => {
    if (companyId && conversationId && companyName) {
      dispatch(loadMessages(companyId, conversationId, companyName));
      const unsubscribe = firestore()
        .collection('chats')
        .doc(companyId)
        .collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Dispatch the setMessages action to update Redux with real-time messages
          dispatch(setMessages(messages));
        });

      // Clean up the listener on component unmount
      return () => unsubscribe(); // Load messages into Redux
    }
  }, [companyId, conversationId, companyName, dispatch]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp of the message
        userId: loginResponse?.data?.id, // User ID of the sender
        firstName: loginResponse?.data?.firstName, // Sender's first name
        companyName: companyName, // The company name
      };
  
      // Dispatch action to add the message to Firestore and Redux
      dispatch(addMessage(companyId, conversationId, message));
  
      // Store company information in the user's chats collection
      firestore()
        .collection('chats')
        .doc(loginResponse?.data?.id) // User's document
        .collection('companies') // Collection of companies the user has messaged
        .doc(companyId) // Document for the specific company
        .set(
          {
            companyId, // Store company ID
            companyName, // Store company name
            lastMessage: newMessage, // Store the last message sent
            lastMessageAt: firestore.FieldValue.serverTimestamp(), // Timestamp of the last message
          },
          { merge: true } // Merge this data with any existing data
        );
  
      // Clear the message input field
      setNewMessage('');
  
      // Scroll to the bottom of the chat after sending
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };
  
  
  const Messages = useSelector(state => state.chat.messages);
  console.log(
    '+++++++++++++++++++++++++++++++++%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
    Messages,
  );

  // Render each message
  const renderMessageItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.userId === loginResponse?.data?.id
          ? styles.myMessage
          : styles.otherMessage,
      ]}>
      <Text style={styles.messageUser}>{item.firstName}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
       {/* <StatusBar backgroundColor={'#f8f9fa'} /> */}
      <View style={styles.header}>
        <Text style={styles.companyNameText}>{companyName}</Text>
      </View>
      <FlatList
        ref={flatListRef} // Attach the ref to the FlatList
        data={Messages} // Use the Redux state 'Messages' for rendering
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        } // Scroll to bottom on content size change
      />
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.TextInputContainer}
          value={newMessage}
          onChangeText={item => {
            setNewMessage(item);
          }}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.primaryWhiteHex}
        />
        {newMessage.length > 0 ? (
          <TouchableOpacity onPress={sendMessage}>
            <Icons
              name="send"
              size={FONTSIZE.size_24}
              color={COLORS.primaryOrangeHex}
              style={styles.InputIcon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:COLORS.secondaryGreyHex,
  },
  header: {
    paddingVertical: 15,
   backgroundColor: '#ffffff',
    //marginLeft:10,
    //alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  companyNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#e1f5fe',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageUser: {
    fontSize: 12,
    color: '#007bff',
    fontFamily:fonts.CircularStdBlack
  },
  messageText: {
    fontSize: 14,
    color: '#000',
    fontFamily:fonts.CircularStdBook
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.space_15,
    marginHorizontal: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_20,
    borderWidth: 1,
    borderColor:COLORS.primaryOrangeHex
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3,
    color: COLORS.primaryWhiteHex,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primaryGreyHex,
  },
  InputIcon: {
    marginHorizontal:20
  },
});

export default ConversationScreen;
