import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTweetComponent } from './form-tweet.component';

describe('FormTweetComponent', () => {
  let component: FormTweetComponent;
  let fixture: ComponentFixture<FormTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
