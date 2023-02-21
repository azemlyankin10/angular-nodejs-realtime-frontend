import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

type AuthTab = 'login' | 'register';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    constructor(private authService: AuthService) {}

    activeTab: AuthTab = 'login';

    toggle(tab: AuthTab) {
        console.log(tab);

        this.activeTab = tab;
    }

    onLogin(e: SubmitEvent) {
        const form = new FormData(e.target as HTMLFormElement);
        const name = form.get('name')?.toString();
        const password = form.get('password')?.toString();

        if (name && password) {
            this.authService.login({ name, password });
        }
    }

    onRegister(e: SubmitEvent) {
        const form = new FormData(e.target as HTMLFormElement);
        const name = form.get('name')?.toString();
        const password = form.get('password')?.toString();

        if (name && password) {
            this.authService.register({ name, password });
        }
    }
}
