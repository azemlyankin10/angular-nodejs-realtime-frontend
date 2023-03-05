import { createReducer, on } from '@ngrx/store';
import { IChat } from 'src/interfaces/chat';
import { IUserProfile } from 'src/interfaces/profile';
import {
    addNewChatToChatList,
    createChatsList,
    pushNewMessage,
} from './chats.actions';

export interface ChatState {
    chatList: IChat[];
    error: string;
    status: 'not load' | 'load';
}

export const initialState: ChatState = {
    chatList: [],
    error: '',
    status: 'not load',
};

export const chatReducer = createReducer(
    // Supply the initial state
    initialState,
    // Add the new chat list array
    on(createChatsList, (state, { chatList }) => ({
        ...state,
        chatList,
    })),
    // add new chat to chat list
    on(addNewChatToChatList, (state, { newChat }) => ({
        ...state,
        chatList: state.chatList.concat(newChat),
    })),
    //Add new message to chat list array
    on(pushNewMessage, (state, { newMessage, roomId }) => {
        const currentChat = state.chatList.find((el) => el._doc._id === roomId);
        const deleteChat = state.chatList.filter(
            (el) => el._doc._id !== roomId
        );

        if (!currentChat) {
            return state;
        }
        const newChat = {
            ...currentChat,
            _doc: {
                ...currentChat._doc,
                messages: currentChat._doc.messages.concat(newMessage),
            },
        };
        return {
            ...state,
            chatList: [newChat, ...deleteChat],
        };
    })
);

// $__: string;
// $isNew: boolean;
// _doc: ICurrentChat;
// participants: IUserProfile[];
