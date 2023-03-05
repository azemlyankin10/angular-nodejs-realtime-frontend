import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppState } from 'src/app/store/app.state';
import { createChatsList } from 'src/app/store/chats/chats.actions';
import { ChatState } from 'src/app/store/chats/chats.reducer';
import { IResentElem } from 'src/interfaces/chat';
import { createRecentChats } from './recent.functions';

@Component({
    selector: 'app-recent',
    templateUrl: './recent.component.html',
    styleUrls: ['./recent.component.scss'],
})
export class RecentComponent {
    chats$!: Observable<ChatState>;
    resentElems$!: Observable<IResentElem[]>;
    isLoading = false;

    constructor(
        private apiService: ApiService,
        private localStorageService: LocalStorageService,
        private store: Store<AppState>
    ) {
        this.isLoading = true;
        this.chats$ = store.select('chats');
        //get data from API and dispatch in state
        this.apiService.getAllChats().subscribe((chats) => {
            this.store.dispatch(createChatsList({ chatList: chats }));
            this.isLoading = false;
        });
        const myId = this.localStorageService.getItem('userId');

        if (!myId) return;
        //get elements form state and create resentElements
        this.resentElems$ = this.chats$.pipe(
            map(({ chatList }) => createRecentChats(chatList, myId))
        );
    }
}
