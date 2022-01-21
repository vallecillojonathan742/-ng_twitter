import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { CheckIfItIsMainThread } from 'src/app/models/check-if-it-is-main-thread';
import { PostList } from 'src/app/models/post-list';
import { PostListSecondary } from 'src/app/models/post-list-secondary';
import { PostSecondaryService } from 'src/app/services/post-secondary.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Output()
  submit = new EventEmitter<CheckIfItIsMainThread>();

  public postList: PostList[] = [];

  public postListSecondary: PostList[] = [];
  public $key: string = '';

  constructor(private postService: PostService, private postSecondaryService:PostSecondaryService) { }

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

  openThread(post: PostList) {
    this.postListSecondary = [];
    const checkIfItIsMainThread = new CheckIfItIsMainThread();
    if(this.$key !== post.$key)
    {
      checkIfItIsMainThread.postList = post;
      checkIfItIsMainThread.isItMainThread = true;
      this.$key = post.$key;

      this.postSecondaryService.getPostLis()
      .snapshotChanges()
      .subscribe( item => {
      this.postListSecondary = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        const data = new PostListSecondary();
        Object.assign(data, x);
        if(data.keyFK == this.$key)
        {
          data.$key = (element.key == null) ? '' : element.key;
          this.postListSecondary.unshift(data);
        }
      });
     
    }); 
    }
    else
    {
      checkIfItIsMainThread.postList = new PostList();
      checkIfItIsMainThread.isItMainThread = false;
      this.$key = '';
    }
    this.submit.emit(checkIfItIsMainThread);
  }

  updatePost(post: PostList) {
    const data = new CheckIfItIsMainThread();
    data.postList = post;
    data.isItMainThread = false;
    this.submit.emit(data);
  }
 

  deletePost(post: PostList) {
    this.postService.deletePost(post);
  }
}
