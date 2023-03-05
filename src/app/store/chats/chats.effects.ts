// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Observable, of } from 'rxjs';
// import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
// import { createChatsList } from './chats.actions';

// @Injectable()
// export class ChatsEffects {
//     constructor(
//         private actions$: Actions // private userService: UserService
//     ) {}

//     getRecentChatsList$: Observable<Actions> = createEffect(() =>
//         this.actions$.pipe(
//             ofType(createChatsList),
//             map((a) => {
//                 console.log(a);
//                 return a
//             })
//             // switchMap(() =>
//                 // this.userService.getUser().pipe(
//                 //     map((user: User) => new LoadUserSuccess(user)),
//                 //     catchError((error) => of(new LoadUserFailure(error)))
//             // )

//     ))

//     //   loadUser$: Observable<Action> = createEffect(() =>
//     //     this.actions$.pipe(
//     //       ofType<LoadUser>(UserActionTypes.LoadUser),
//     //       mergeMap(() =>
//     //         this.userService.getUser().pipe(
//     //           map((user: User) => new LoadUserSuccess(user)),
//     //           catchError((error) => of(new LoadUserFailure(error)))
//     //         )
//     //       )
//     //     )
//     //   );
// }
