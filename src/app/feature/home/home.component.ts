import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = "Home";

  constructor() { }

  ngOnInit(): void {
  }

}
