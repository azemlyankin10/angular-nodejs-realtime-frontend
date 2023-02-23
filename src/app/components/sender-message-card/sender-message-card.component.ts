import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sender-message-card',
    templateUrl: './sender-message-card.component.html',
    styleUrls: ['./sender-message-card.component.scss'],
})
export class SenderMessageCardComponent {
    @Input() message: any = {};
}
