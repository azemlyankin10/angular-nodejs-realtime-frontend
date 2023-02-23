import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SocketChatService } from 'src/app/services/socket-chat.service';

@Component({
    selector: 'app-typing-area',
    templateUrl: './typing-area.component.html',
    styleUrls: ['./typing-area.component.scss'],
})
export class TypingAreaComponent {
    constructor(private socketChatService: SocketChatService) {}
    @ViewChild('messageInput', { static: true }) messageInput!: ElementRef;

    @Input() room = '';

    onSubmit() {
        //sent message
        const value = this.messageInput.nativeElement.value;
        if (!value) return;

        this.socketChatService.sendChatMessage(this.room, value);
        this.messageInput.nativeElement.value = '';
    }
}
