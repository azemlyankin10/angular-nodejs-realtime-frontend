import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IUserProfile } from 'src/interfaces/profile';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(private apiService: ApiService) {}
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

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
        this.apiService.openChat(id).subscribe((data) => {
            //get new chat
            // TODO: add to common state recent chats!!!
            console.log(data);
        });

        this.isOpenDropdown = false;
    }
}
