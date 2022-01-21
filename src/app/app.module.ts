import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { FormTweetComponent } from './feature/form-tweet/form-tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './feature/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormTweetComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
