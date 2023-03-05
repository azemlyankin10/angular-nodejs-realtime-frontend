import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { IMessageSocket } from 'src/interfaces/chat';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class SocketChatService {
    constructor(
        private socket: Socket,
        private localStorageService: LocalStorageService
    ) {}

    getChatMessages(roomId: string): Observable<any> {
        console.log('socket');

        // Create an observable to listen for chat message events from the server
        return new Observable<IMessageSocket>((observer) => {
            this.socket.emit('join', roomId);

            this.socket.on('message', (messages: any) => {
                observer.next(messages);
            });

            // Clean up the observer when the component is destroyed
            // return () => {
            //     this.socket.emit('leave', roomId);
            //     observer.complete();
            // };
        });
    }

    // leaveChatRoom(roomId: string) {
    //     console.log('leave room');

    //     // return new Observable(() => {
    //     this.socket.emit('leave', roomId);
    //     // });
    // }

    sendChatMessage(roomId: string, message: string): void {
        const newMessage: IMessageSocket = {
            sender: this.localStorageService.getItem('userId') as string,
            room: roomId,
            text: message,
            createdAt: new Date(),
        };
        this.socket.emit('message', newMessage);
    }
}
