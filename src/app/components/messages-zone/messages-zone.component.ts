import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SocketChatService } from 'src/app/services/socket-chat.service';

@Component({
    selector: 'app-messages-zone',
    templateUrl: './messages-zone.component.html',
    styleUrls: ['./messages-zone.component.scss'],
})
export class MessagesZoneComponent implements OnInit {
    constructor(
        private socketChatService: SocketChatService,
        private apiService: ApiService,
        private sessionStorageService: SessionStorageService
    ) {}
    @ViewChild('chatWindow', { static: true }) chatWindow!: ElementRef;
    private audio: HTMLAudioElement = new Audio();

    @Input() roomId = '';
    messageList: any[] = [];
    userId = this.sessionStorageService.getItem('userId');

    ngOnInit() {
        if (!this.roomId) return;

        //init message list
        this.apiService
            .getMessageList(this.roomId)
            .pipe(
                tap((data) => {
                    this.messageList = data.messages;
                })
            )
            .subscribe(() => this.scrollToBottom());

        //socket create message
        this.socketChatService
            .getChatMessages(this.roomId)
            .pipe(
                tap((message) => {
                    message.createdAt = new Date();
                    this.messageList.push(message);

                    //play audio
                    this.audio.src = 'assets/sounds/sent_message.mp3';
                    this.audio.load();
                    this.audio.play();
                })
            )
            .subscribe(() => this.scrollToBottom());
    }

    private scrollToBottom() {
        setTimeout(() => {
            //scroll to bottom
            this.chatWindow.nativeElement.scrollTo(
                0,
                this.chatWindow.nativeElement.scrollHeight
            );
        }, 0);
    }
}
