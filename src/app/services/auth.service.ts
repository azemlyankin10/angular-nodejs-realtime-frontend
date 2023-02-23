import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
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
        private router: Router
    ) {}

    //get token form localstorage
    isLoggedIn() {
        return this.localStorageService.getItem('token');
    }

    // register new user
    register(body: { name: string; password: string }) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .post(`${environment.serverUri}/register`, body, { headers })
            .subscribe(
                (res: IAuthResp) => {
                    //if success get token and redirect
                    if ('token' in res) {
                        this.localStorageService.setItem('token', res.token);
                        this.router.navigate(['/']);
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
                    if ('token' in res) {
                        this.localStorageService.setItem('token', res.token);
                        this.router.navigate(['/']);
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
        return of(this.localStorageService.removeItem('token')).subscribe(
            () => {
                this.router.navigate(['/auth']);
                console.log('Logout is success');
            }
        );
    }
}
