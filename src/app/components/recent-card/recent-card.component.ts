import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { changeChatId } from 'src/app/store/common/common.actions';
import { IUserProfile } from 'src/interfaces/profile';

@Component({
    selector: 'app-recent-card',
    templateUrl: './recent-card.component.html',
    styleUrls: ['./recent-card.component.scss'],
})
export class RecentCardComponent {
    constructor(private store: Store<AppState>, private router: Router) {
        const commonState$ = store.select('common');
        commonState$.subscribe((state) => {
            this.activeRoom = state.currentChat;
        });
    }

    activeRoom = '';
    @Input() names!: IUserProfile[];
    @Input() lastMessageDate: string | undefined = '';
    @Input() lastMessage: string | undefined = '';
    @Input() linkToChat: string | undefined = '';

    changeChatRoom() {
        if (!this.linkToChat) return;

        this.router.navigate([`/room/${this.linkToChat}`]);

        this.store.dispatch(changeChatId({ chatId: this.linkToChat }));
    }
}
