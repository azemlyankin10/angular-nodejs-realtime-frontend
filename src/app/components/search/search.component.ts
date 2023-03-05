import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    debounceTime,
    distinctUntilChanged,
    fromEvent,
    Observable,
    switchMap,
} from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from 'src/app/store/app.state';
import { addNewChatToChatList } from 'src/app/store/chats/chats.actions';
import { ChatState } from 'src/app/store/chats/chats.reducer';
import { IUserProfile } from 'src/interfaces/profile';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(
        private apiService: ApiService,
        private store: Store<AppState>
    ) {
        this.chats$ = store.select('chats');
    }
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    chats$!: Observable<ChatState>;
    isOpenDropdown = false;
    searchResults: IUserProfile[] = [];

    ngOnInit() {
        const input = this.searchInput.nativeElement;
        if (!input) return;

        //get users from api
        fromEvent(input, 'input')
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(() => this.apiService.getUsers(input.value))
            )
            .subscribe((data) => {
                if (input.value.length < 1) {
                    this.isOpenDropdown = false;
                    return;
                }

                this.isOpenDropdown = true;
                this.searchResults = data;
            });
    }

    //open selected chat and close dropdown
    onDropdown(e: MouseEvent) {
        const id = (e.target as HTMLElement).id;
        this.chats$.subscribe((data) => {
            const user = data.chatList
                .map((el) => el.participants)
                .flat(1)
                .find((el) => el._id === id);

            if (!user) {
                this.apiService.openChat(id).subscribe((newChat) => {
                    //get new chat
                    this.store.dispatch(addNewChatToChatList({ newChat }));
                });
            }

            this.isOpenDropdown = false;
            this.searchInput.nativeElement.value = '';
        });
    }
}
