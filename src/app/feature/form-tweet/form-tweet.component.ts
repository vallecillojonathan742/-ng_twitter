import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-tweet',
  templateUrl: './form-tweet.component.html',
  styleUrls: ['./form-tweet.component.scss']
})
export class FormTweetComponent implements OnInit {

  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(288)]),
    user: new FormControl('User1', Validators.required)
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
