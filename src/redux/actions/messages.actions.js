// chatActions.js
import firestore from '@react-native-firebase/firestore';
import { ADD_MESSAGE, LOAD_MESSAGES, SET_MESSAGES } from '../constants';


// Action to load messages from Firestore
export const loadMessages = (companyId, conversationId) => async (dispatch) => {
  try {
    const messages = [];
    const querySnapshot = await firestore()
      .collection('chats')
      .doc(companyId)
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .get();

    querySnapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    dispatch({
      type: LOAD_MESSAGES,
      payload: messages,
    });
  } catch (error) {
    console.error('Error loading messages:', error);
  }
};

// Action to add a new message
export const addMessage = (companyId, conversationId, message) => async (dispatch) => {
  try {
    await firestore()
      .collection('chats')
      .doc(companyId)
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .add(message);

    dispatch({
      type: ADD_MESSAGE,
      payload: message,
    });
  } catch (error) {
    console.error('Error adding message:', error);
  }
};
export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};
