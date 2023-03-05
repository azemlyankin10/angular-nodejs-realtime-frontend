import { createAction, props } from '@ngrx/store';
import { IChat, ICurrentChat, IMessageSocket } from 'src/interfaces/chat';

export const createChatsList = createAction(
    'Create_Chat_List',
    props<{ chatList: IChat[] }>()
);

export const addNewChatToChatList = createAction(
    'Add_New_Chat_To_Chat_List',
    props<{ newChat: IChat }>()
);

export const pushNewMessage = createAction(
    'Push_New_Message_To_Chat_List',
    props<{ newMessage: IMessageSocket; roomId: string }>()
);
