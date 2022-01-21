import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { PostList } from 'src/app/models/post-list';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public postList: PostList[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostLis()
    .snapshotChanges()
    .subscribe( item => {
      this.postList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        console.log(x);
        const data = new PostList();
        Object.assign(data, x);
        data.$key = (element.key == null) ? '' : element.key;
        this.postList.unshift(data);
      });
     
    });  


  }
 

  addPost(postArg: PostList) {
    // debugger;
    // let post = new PostList();
    // post.user = postArg.user;
    // post.message = postArg.message;
    // post.createTweet = new Date();
    // this.postList.unshift(post);
 
  }
}
