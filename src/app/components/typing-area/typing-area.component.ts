import { Component } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
    selector: 'app-typing-area',
    templateUrl: './typing-area.component.html',
    styleUrls: ['./typing-area.component.scss'],
})
export class TypingAreaComponent {
    constructor(private messagesService: MessagesService) {}
    onSubmit(e: SubmitEvent) {
        const value = new FormData(e.target as HTMLFormElement)
            .get('messageInput')
            ?.toString();
        value && this.messagesService.sendMessage(value);
    }
}
