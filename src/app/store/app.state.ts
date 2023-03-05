import { ChatState } from './chats/chats.reducer';
import { CommonState } from './common/common.reducer';

export interface AppState {
    chats: ChatState;
    common: CommonState;
}
