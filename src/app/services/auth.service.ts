import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthResp } from 'src/interfaces/auth';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient,
        private location: Location
    ) {}

    //get token form localstorage
    isLoggedIn() {
        return (
            this.localStorageService.getItem('token') &&
            this.localStorageService.getItem('userId')
        );
    }

    // register new user
    register(body: { name: string; password: string }) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .post(`${environment.serverUri}/register`, body, { headers })
            .subscribe(
                (res: IAuthResp) => {
                    //if success get token and redirect
                    if ('token' in res && 'user' in res) {
                        this.localStorageService.setItem('token', res.token);
                        this.localStorageService.setItem(
                            'userId',
                            res.user?._id as string
                        );

                        this.location.go('/');
                        window.location.reload();
                        return;
                    }
                    alert('Something went wrong!');
                },
                (e) => {
                    alert(e.error);
                    console.error('register error', e);
                }
            );
    }

    //login function
    login(body: { name: string; password: string }) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .post(`${environment.serverUri}/login`, body, { headers })
            .subscribe(
                (res: IAuthResp) => {
                    //if success get token and redirect
                    if ('token' in res && 'user' in res) {
                        this.localStorageService.setItem('token', res.token);
                        this.localStorageService.setItem(
                            'userId',
                            res.user?._id as string
                        );

                        this.location.go('/');
                        window.location.reload();
                        return;
                    }
                    alert('Something went wrong!');
                },
                (e) => {
                    alert(e.error);
                    console.error('login error', e);
                }
            );
    }

    //logout function
    logout() {
        this.localStorageService.removeItem('token');
        this.localStorageService.removeItem('userId');
        console.log('Logout is success');
        this.location.go('/auth');
        window.location.reload();
    }
}
