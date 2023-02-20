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

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    RecentComponent,
    MessagesZoneComponent,
    TypingAreaComponent,
    RecentCardComponent,
    SenderMessageCardComponent,
    RecieverMessageCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
