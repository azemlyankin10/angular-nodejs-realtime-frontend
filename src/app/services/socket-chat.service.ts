import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class SocketChatService {
    constructor(
        private socket: Socket,
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private localStorageService: LocalStorageService
    ) {}

    getChatMessages(roomId: string): Observable<any> {
        // Create an observable to listen for chat message events from the server
        return new Observable<[]>((observer) => {
            this.socket.emit('join', roomId);

            this.socket.on('message', (messages: any) => {
                observer.next(messages);
            });

            // Clean up the observer when the component is destroyed
            return () => {
                this.socket.emit('leaveRoom', roomId);
                observer.complete();
            };
        });
    }

    sendChatMessage(roomId: string, message: string): void {
        this.socket.emit('message', {
            sender: this.sessionStorageService.getItem('userId') as string,
            room: roomId,
            text: message,
        });
    }

    // getMessageList(roomId: string) {
    //     console.log(roomId);

    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${this.localStorageService.getItem(
    //             'token'
    //         )}`,
    //     });
    //     return this.http.get(`${environment.serverUri}/chat/${roomId}`, {
    //         headers,
    //     });
    // }
}
