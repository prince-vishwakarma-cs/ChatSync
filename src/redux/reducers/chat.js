import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../libs/features";
import { NEW_MESSAGE_ALERT } from "../../components/constants/event";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    notificationCount: 0,
    newMessageAlert:getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true}) || [],
  },
  reducers: {
    IncrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    ResetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },

    removeNewMessageAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== action.payload.chatId
      );
    },
  },
});

export default chatSlice;
export const {
  IncrementNotificationCount,
  ResetNotificationCount,
  setNewMessageAlert,
  removeNewMessageAlert
} = chatSlice.actions;
