import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { RecentComponent } from './components/recent/recent.component';
import { MessagesZoneComponent } from './components/messages-zone/messages-zone.component';
import { TypingAreaComponent } from './components/typing-area/typing-area.component';
import { RecentCardComponent } from './components/recent-card/recent-card.component';
import { SenderMessageCardComponent } from './components/sender-message-card/sender-message-card.component';
import { RecieverMessageCardComponent } from './components/reciever-message-card/reciever-message-card.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './pages/auth/auth.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';

const config: SocketIoConfig = { url: environment.serverUri, options: {} };

@NgModule({
    declarations: [
        AppComponent,
        ChatRoomComponent,
        RecentComponent,
        MessagesZoneComponent,
        TypingAreaComponent,
        RecentCardComponent,
        SenderMessageCardComponent,
        RecieverMessageCardComponent,
        AuthComponent,
        NavComponent,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SocketIoModule.forRoot(config),
        FormsModule,
        CommonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
