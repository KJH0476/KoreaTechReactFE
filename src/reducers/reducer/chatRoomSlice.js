import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatRoom: [],
};

const chatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState,
    reducers: {
        addChatRoom(state, action) {
            const newChatRoom = action.payload.filter(newChatRoom =>
                !state.chatRoom.some(existingChatRoom => existingChatRoom.id === newChatRoom.id)
            );
            state.chatRoom.push(...newChatRoom);
        },
        removeChatRoom(state, action) {
            state.chatRoom = state.chatRoom.filter(chatRoom => chatRoom.id !== action.payload);
        },
        clearChatRoom(state) {
            state.chatRoom = [];
        },
    },
});

export const { addChatRoom, removeChatRoom, clearChatRoom} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;