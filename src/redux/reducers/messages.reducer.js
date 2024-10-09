// chatReducer.js

import { ADD_MESSAGE, LOAD_MESSAGES, SET_MESSAGES } from "../constants";

const initialState = {
  messages: [],
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload], // Add the new message to the end
      };
      case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload, // Set messages directly
      };

    default:
      return state;
  }
};
