import { Component, ComponentRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'src/app/models/guide';
import { PostList } from 'src/app/models/post-list';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-form-tweet',
  templateUrl: './form-tweet.component.html',
  styleUrls: ['./form-tweet.component.scss']
})
export class FormTweetComponent implements OnInit {

  public disabledInput = true;
  public isEdit = false;
  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(288)]),
    user: new FormControl('User_'+Guid.newGuid(), [Validators.required]),
    key: new FormControl('')
  });
  
  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPostLis()
      .stateChanges().subscribe( item => {
        console.log(item);
    });
  
  }

  submitButton()
  {
    if(this.form.valid)
    {
      debugger;
      const post = new PostList();
      post.user = this.form.controls['user'].value;
      post.$key =  this.form.controls['key'].value;
      post.message = this.form.controls['message'].value;

      if( post.$key == '' ||  post.$key == null)
      {
        this.postService.insertPost(post);
      }
      else
      {
        this.postService.updatePost(post,post.user);
      }

      this.form.reset();
      this.isEdit = false;
      this.disabledInput = true;
      this.form.controls['user'].setValue('User_'+Guid.newGuid());
      this.postService.selectPost = new PostList();
    }
    else
    {
      alert("ERROR!");
    }
  }

  checkedInputUser(arg: any)
  {
    if(this.disabledInput)
    {
      this.disabledInput = false;
      this.form.controls['user'].setValue('');
    }
    else
    {
      this.disabledInput = true;
      this.form.controls['user'].setValue('User_'+Guid.newGuid());
    }
  }

  editFormTweet(post: PostList)
  {
    this.form.reset();
    this.isEdit = true;
    this.form.controls['user'].setValue(post.user);
    this.form.controls['message'].setValue(post.message);
    this.form.controls['key'].setValue(post.$key);
  }

  clear() {
    this.form.reset();
    this.form.controls['user'].setValue('User_'+Guid.newGuid());
    this.isEdit = false;
  }

  

}
