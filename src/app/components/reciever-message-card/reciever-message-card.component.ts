import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-reciever-message-card',
    templateUrl: './reciever-message-card.component.html',
    styleUrls: ['./reciever-message-card.component.scss'],
})
export class RecieverMessageCardComponent {
    @Input() message = '';
}
