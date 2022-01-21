import { Component, ComponentRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'src/app/class/guide';
import { PostList } from 'src/app/interfaces/post-list';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-form-tweet',
  templateUrl: './form-tweet.component.html',
  styleUrls: ['./form-tweet.component.scss']
})
export class FormTweetComponent implements OnInit {

  @Output()
  public submit = new EventEmitter<PostList>();

  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(288)]),
    user: new FormControl('User_'+Guid.newGuid(), Validators.required)
  });
  
  constructor() {
   }

  ngOnInit(): void {
  }

  submitButton()
  {
    if(this.form.valid)
    {
      debugger;
      const post = new PostList();
      post.user = this.form.controls['user'].value;
      post.message = this.form.controls['message'].value;
      this.submit.emit(post);
    }
    else
    {
      alert("ERROR!");
    }
  }

  

}
