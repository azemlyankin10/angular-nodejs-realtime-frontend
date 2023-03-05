import { IUserProfile } from './profile';

export interface ICurrentChat {
    _id: string;
    participants: string[] | IUserProfile[];
    messages: IMessageSocket[];
    createdAt: Date;
    __v: number;
}

// interface message {
//     sender?: string;
//     text?: string;
//     createdAt?: Date;
// }

export interface IChat {
    $__: string;
    $isNew: boolean;
    _doc: ICurrentChat;
    participants: IUserProfile[];
}

export interface IResentElem {
    names: IUserProfile[];
    lastMessageDate?: string;
    lastMessage?: string;
    room: string;
}

export interface IMessage {
    date: string;
    msg: string;
    id: string;
    userId: string;
    userName: string;
}

export interface IMessageSocket {
    sender: string;
    room?: string;
    text: string;
    createdAt: Date;
    _id?: string;
}
