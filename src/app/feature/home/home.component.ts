import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { PostList } from 'src/app/models/post-list';
import { FormTweetComponent } from '../form-tweet/form-tweet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(FormTweetComponent) formTweetComponent!: FormTweetComponent;

  public title = "Home";

  constructor() { }

  ngOnInit(): void {
  }

  submitFormTweet(post: PostList) {
    this.formTweetComponent.editFormTweet(post);
  }

}
