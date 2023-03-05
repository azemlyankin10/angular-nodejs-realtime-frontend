import { createAction, props } from '@ngrx/store';

export const changeChatId = createAction(
    'Change_Chat_Id',
    props<{ chatId: string }>()
);
