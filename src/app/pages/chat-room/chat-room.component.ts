import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { changeChatId } from 'src/app/store/common/common.actions';

@Component({
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
    constructor(private route: ActivatedRoute, private store: Store<AppState>) {
        const commonState$ = store.select('common');
        commonState$.subscribe((state) => {
            this.roomId = state.currentChat;
        });
    }

    isOpenRoom = false;
    roomId = '';

    ngOnInit() {
        //get room id from URI and open the chat room
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id) {
                this.isOpenRoom = true;
                this.store.dispatch(changeChatId({ chatId: id }));
            }
        });
    }
}
