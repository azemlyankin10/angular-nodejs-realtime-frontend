import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUserProfile } from 'src/interfaces/profile';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private apiService: ApiService
    ) {}
    isOpenNav = false;
    user!: IUserProfile;

    ngOnInit() {
        //get user data
        this.apiService.getProfile().subscribe((userData) => {
            this.user = userData;
        });
    }

    //toggle dropdown
    toggleNav() {
        this.isOpenNav = !this.isOpenNav;
    }

    logout() {
        this.authService.logout();
    }
}
