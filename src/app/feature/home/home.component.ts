import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PostList } from 'src/app/interfaces/post-list';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = "Home";

  @ViewChild(PostListComponent)
  contactComponent!: PostListComponent;
  

  constructor() { }

  ngOnInit(): void {
  }

  submitPostList(post:PostList) {
    this.contactComponent.addPost(post);
  }

}
