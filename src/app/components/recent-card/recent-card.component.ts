import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserProfile } from 'src/interfaces/profile';

@Component({
    selector: 'app-recent-card',
    templateUrl: './recent-card.component.html',
    styleUrls: ['./recent-card.component.scss'],
})
export class RecentCardComponent {
    @Input() names!: IUserProfile[];
    @Input() lastMessageDate: string | undefined = '';
    @Input() lastMessage: string | undefined = '';
    @Input() linkToChat: string | undefined = '';
}
