import { createReducer, on } from '@ngrx/store';
import { changeChatId } from './common.actions';

export interface CommonState {
    currentChat: string;
}

export const initialState: CommonState = {
    currentChat: '',
};

export const commonReducer = createReducer(
    initialState,
    // Change chat Id (chat room)
    on(changeChatId, (state, { chatId }) => ({
        ...state,
        currentChat: chatId,
    }))
);
