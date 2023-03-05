import { IChat, IResentElem } from 'src/interfaces/chat';

export const createRecentChats = (
    chats: IChat[],
    myId: string
): IResentElem[] =>
    chats.map((chat) => {
        const names = chat.participants.filter((el) => el._id !== myId);
        //get date of last message
        const messages = chat._doc.messages;
        const lastMessageDate = messages
            ? messages[messages.length - 1]?.createdAt.toString()
            : '';
        //get last message
        const lastMessage = messages ? messages[messages.length - 1]?.text : '';
        //get room id
        const room = chat._doc._id;

        return {
            names,
            lastMessageDate,
            lastMessage,
            room,
        };
    });
