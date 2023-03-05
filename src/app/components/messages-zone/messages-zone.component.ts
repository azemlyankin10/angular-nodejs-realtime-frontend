import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SocketChatService } from 'src/app/services/socket-chat.service';
import { AppState } from 'src/app/store/app.state';
import { pushNewMessage } from 'src/app/store/chats/chats.actions';

@Component({
    selector: 'app-messages-zone',
    templateUrl: './messages-zone.component.html',
    styleUrls: ['./messages-zone.component.scss'],
})
export class MessagesZoneComponent implements OnChanges {
    constructor(
        private socketChatService: SocketChatService,
        private apiService: ApiService,
        private localStorageService: LocalStorageService,
        private store: Store<AppState>
    ) {
        //play audio
        this.audio.src = 'assets/sounds/sent_message.mp3';
        this.audio.load();
    }

    @ViewChild('chatWindow', { static: true }) chatWindow!: ElementRef;
    private audio: HTMLAudioElement = new Audio();
    @Input() roomId = '';
    messageList: any[] = [];
    userId = this.localStorageService.getItem('userId');
    isLoading = false;
    room$: any;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['roomId']) {
            this.isLoading = true;
            //init message list
            this.apiService
                .getMessageList(this.roomId)
                .pipe(
                    tap((data) => {
                        this.messageList = data.messages;
                    })
                )
                .subscribe(() => {
                    this.scrollToBottom();
                    this.isLoading = false;
                });

            // //unsubscribe from previousRoom previous room
            if (changes['roomId'].previousValue) {
                this.room$.unsubscribe();
            }

            //socket create message
            this.room$ = this.socketChatService
                .getChatMessages(this.roomId)
                .pipe(
                    tap((message) => {
                        this.messageList.push(message);
                        this.store.dispatch(
                            pushNewMessage({
                                newMessage: message,
                                roomId: this.roomId,
                            })
                        );

                        // play audio
                        this.audio.play();
                    })
                )
                .subscribe(() => this.scrollToBottom());
        }
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
