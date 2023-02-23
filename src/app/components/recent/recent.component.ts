import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { IChat, IResentElem } from 'src/interfaces/chat';

@Component({
    selector: 'app-recent',
    templateUrl: './recent.component.html',
    styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit {
    constructor(
        private apiService: ApiService,
        private sessionStorageService: SessionStorageService
    ) {}

    chats!: IResentElem[];

    ngOnInit() {
        this.apiService.getAllChats().subscribe((chats) => {
            const myId = this.sessionStorageService.getItem('userId');
            // function for creating resentElement
            const createChats = (chat: IChat): IResentElem => {
                //delete my name in resent array
                const names = chat.participants.filter((el) => el._id !== myId);
                //get date of last message
                const messages = chat._doc.messages;
                const lastMessageDate =
                    messages.length > 0
                        ? messages[messages.length - 1].createdAt?.toString()
                        : chat._doc.createdAt.toString();
                //get last message
                const lastMessage = messages.length > 0 ? messages[0].text : '';
                //get room id
                const room = chat._doc._id;
                return {
                    names,
                    lastMessageDate,
                    lastMessage,
                    room,
                };
            };

            //create resentElements
            this.chats = chats.map(createChats);
        });
    }
}
