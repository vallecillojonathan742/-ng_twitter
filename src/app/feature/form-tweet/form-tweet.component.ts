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

  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(288)]),
    user: new FormControl('User_'+Guid.newGuid(), [Validators.required])
  });
  
  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    debugger;
    this.postService.getPostLis()
      .stateChanges().subscribe( item => {
        debugger;
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
      post.message = this.form.controls['message'].value;
      this.postService.insertPost(post);
      this.form.reset();
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

  

}
