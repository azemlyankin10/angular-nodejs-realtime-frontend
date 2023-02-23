import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IChat, ICurrentChat } from 'src/interfaces/chat';
import { IUserProfile } from 'src/interfaces/profile';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private sessionStorageService: SessionStorageService
    ) {}
    //get auth token from localstorage
    authToken = this.localStorageService.getItem('token');

    //search users
    getUsers(searchStr: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`,
        });
        const url = `${environment.serverUri}/user/search?q=${searchStr}`;
        return this.http.get<IUserProfile[]>(url, { headers });
    }

    //create new chat
    openChat(userId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`,
        });
        const url = `${environment.serverUri}/chat/create`;
        return this.http.post<IChat>(url, { userId }, { headers });
    }

    //get all chats
    getAllChats() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`,
        });
        const url = `${environment.serverUri}/chat/all`;
        return this.http.get<IChat[]>(url, { headers });
    }

    //get user my user profile and set userId in sessionStorage
    getProfile() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`,
        });
        const url = `${environment.serverUri}/profile/myProfile`;
        return this.http.get<IUserProfile>(url, { headers }).pipe(
            tap((el) => {
                this.sessionStorageService.setItem('userId', el._id);
            })
        );
    }

    //get messages for current room
    getMessageList(roomId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`,
        });
        const url = `${environment.serverUri}/chat/${roomId}`;
        return this.http.get<ICurrentChat>(url, { headers });
    }
}
