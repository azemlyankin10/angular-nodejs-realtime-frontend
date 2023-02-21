import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    constructor(private authService: AuthService) {}
    isOpenNav = false;

    toggleNav() {
        this.isOpenNav = !this.isOpenNav;
    }

    logout() {
        this.authService.logout();
    }
}
