import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';

const routes: Routes = [
    { path: '', component: ChatRoomComponent, canActivate: [AuthGuard] },
    {
        path: 'room/:id',
        component: ChatRoomComponent,
        canActivate: [AuthGuard],
    },
    { path: 'auth', component: AuthComponent },
    { path: '**', component: ChatRoomComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
