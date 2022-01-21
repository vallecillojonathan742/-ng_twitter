import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { PostList } from 'src/app/models/post-list';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Output()
  submit = new EventEmitter<PostList>();

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

  updatePost(post: PostList) {
    this.submit.emit(post);
  }
 

  deletePost(post: PostList) {
    this.postService.deletePost(post);
  }
}
