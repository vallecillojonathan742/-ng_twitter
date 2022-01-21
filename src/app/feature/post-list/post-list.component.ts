import { Component, Input, OnInit } from '@angular/core';
import { PostList } from 'src/app/interfaces/post-list';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public postList: PostList[] = [];
  originalPosts: PostList[] = [...this.postList];

  constructor() { }

  ngOnInit(): void {
    this.tenSeconds();
  }

  tenSeconds = () => {
    this.tenTweets();
    setTimeout(this.tenSeconds, 10000);
  };

  tenTweets = () => {
    for (let i = 0; i < 10; i++) {
      let newPost = this.createPost();
      this.postList.push(newPost);
   
    }
    this.originalPosts = [...this.postList];
  };

  createPost = () => {
    let post = new PostList();
    post.user = this.selectRandomElement(this.usernames);
    post.message = this.createRandomSentence();
    post.createTweet = new Date();
    return post;
  };

  createRandomSentence = () => {
    return `${this.selectRandomElement(
      this.beginning
    )} ${this.selectRandomElement(this.verbs)} ${this.selectRandomElement(
      this.posess
    )} ${this.selectRandomElement(this.nouns)}`;
  };

  usernames = [
    "BobLobLaw",
    "WhoWhatWhenWhereAndWhy",
    "User13135",
    "Noob",
    "ABCDEFB"
  ];

  beginning = [
    "just",
    "ask me how i",
    "totally",
    "nearly",
    "productively",
    "Who",
    "last night i",
    "the president",
    "that dude",
    "a dinosaur",
    "a dog"
  ];

  verbs = [
    "jumpped",
    "ran",
    "fell",
    "drank",
    "slipped",
    "sat",
    "saw",
    "went",
    "tripped",
    "sped",
    "built",
    "started"
  ];

  posess = ["your", "the", "my", "that", "this", "a", "an"];

  nouns = [
    "car",
    "cat",
    "bike",
    "dog",
    "house",
    "mouse",
    "tree",
    "mountain",
    "building",
    "computer",
    "Nicolas Caige"
  ];

  selectRandomElement(arr: string[]) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  
  onSelect(e:any): void {
    this.postList = this.postList.filter(post => post.user === e.target.id);

  }

  addPost(postArg: PostList) {
    debugger;
    let post = new PostList();
    post.user = postArg.user;
    post.message = postArg.message;
    post.createTweet = new Date();
    this.postList.unshift(post);
    this.originalPosts = [...this.postList];
  };



}
