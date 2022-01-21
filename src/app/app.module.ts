import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { FormTweetComponent } from './feature/form-tweet/form-tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './feature/post-list/post-list.component';


import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PostService } from './services/post.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostSecondaryService } from './services/post-secondary.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormTweetComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    
    
  ],
  providers: [PostService,AngularFireAuth,AngularFireDatabase,PostSecondaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
