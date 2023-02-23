import { IUserProfile } from './profile';

export interface ICurrentChat {
    _id: string;
    participants: string[];
    messages: message[];
    createdAt: Date;
    __v: number;
}

interface message {
    sender?: string;
    text?: string;
    createdAt?: Date;
}

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
