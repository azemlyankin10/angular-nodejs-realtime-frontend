import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MessagesService {
    constructor(private socket: Socket, private http: HttpClient) {}

    sendMessage(msg: string) {
        console.log(msg);
        this.socket.emit('message', msg);
    }

    getMessage() {
        return new Observable((observer: Observer<any>) => {
            this.socket.on('message', (message: string) => {
                observer.next(message);
            });
        });
    }

    getMessageList() {
        return this.http.get(`${environment.serverUri}/messages`);
    }
}
