import { NgModule, isDevMode } from '@angular/core';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { chatReducer } from './store/chats/chats.reducer';
import { commonReducer } from './store/common/common.reducer';
import { SpinnerComponent } from './components/spinner/spinner.component';
// import { EffectsModule } from '@ngrx/effects';
// import { ChatsEffects } from './store/chats/chats.effects';

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
        SpinnerComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SocketIoModule.forRoot(config),
        FormsModule,
        CommonModule,
        StoreModule.forRoot({ chats: chatReducer, common: commonReducer }),
        // EffectsModule.forRoot([ChatsEffects]),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
