import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    isOpenRoom = false;
    roomId = '';

    ngOnInit() {
        //get room id from URI and open the chat room
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id) {
                this.roomId = id;
                this.isOpenRoom = true;
                return id;
            }
            return;
        });
    }
}
