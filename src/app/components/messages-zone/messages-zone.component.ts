import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
    selector: 'app-messages-zone',
    templateUrl: './messages-zone.component.html',
    styleUrls: ['./messages-zone.component.scss'],
})
export class MessagesZoneComponent implements OnInit {
    constructor(private messageService: MessagesService) {}

    messageList: string[] = [];

    ngOnInit() {
        this.messageService.getMessage().subscribe((message: string) => {
            this.messageList.push(message);
        });

        this.messageService.getMessageList().subscribe((messages: any) => {
            this.messageList = messages;
        });
    }
}
