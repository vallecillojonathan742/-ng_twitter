import { Component, ComponentRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckIfItIsMainThread } from 'src/app/models/check-if-it-is-main-thread';
import { Guid } from 'src/app/models/guide';
import { PostList } from 'src/app/models/post-list';
import { PostListSecondary } from 'src/app/models/post-list-secondary';
import { PostSecondaryService } from 'src/app/services/post-secondary.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-form-tweet',
  templateUrl: './form-tweet.component.html',
  styleUrls: ['./form-tweet.component.scss']
})
export class FormTweetComponent implements OnInit {

  public disabledInput = true;
  public isEdit = false;
  public isItMainThread = false;
  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(288)]),
    user: new FormControl('User_'+Guid.newGuid(), [Validators.required]),
    key: new FormControl('')
  });

  formSecondaryThread = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(288)]),
    user: new FormControl('User_'+Guid.newGuid(), [Validators.required]),
    keyFK: new FormControl('',Validators.required)
  });
  
  constructor(private postService: PostService, private postSecondaryService:PostSecondaryService) {
  }

  ngOnInit(): void {
    this.postService.getPostLis()
      .stateChanges().subscribe( item => {
        console.log(item);
    });
  }
  
  submitButtonFormSecondaryThread()
  {
    if(this.formSecondaryThread.valid)
    {
      const post = new PostListSecondary();
      post.user = this.formSecondaryThread.controls['user'].value;
      post.keyFK =  this.formSecondaryThread.controls['keyFK'].value;
      post.message = this.formSecondaryThread.controls['message'].value;

      this.postSecondaryService.insertPost(post);

      this.isItMainThread = false;
      this.formSecondaryThread.reset();
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

  submitButton()
  {
    if(this.form.valid)
    {
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

  editFormTweet(checkIfItIsMainThread: CheckIfItIsMainThread)
  {
    const post = checkIfItIsMainThread.postList;
    this.form.reset();
    this.formSecondaryThread.reset();
    this.isEdit = true;
    this.isItMainThread = checkIfItIsMainThread.isItMainThread;
    if(!checkIfItIsMainThread.isItMainThread)
    {
      this.form.controls['user'].setValue('User_'+Guid.newGuid());
      if(post.user != '')
      {
        this.form.controls['user'].setValue(post.user);
      }
      
      this.form.controls['message'].setValue(post.message);
      this.form.controls['key'].setValue(post.$key);
    }
    else
    {
      this.formSecondaryThread.controls['keyFK'].setValue(post.$key);
      this.formSecondaryThread.controls['user'].setValue('User_'+Guid.newGuid());
    }
    
  }

  clear() {
    this.form.reset();
    this.form.controls['user'].setValue('User_'+Guid.newGuid());
    this.isEdit = false;
  }

  

}
