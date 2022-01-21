import {Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { PostList } from '../models/post-list';

@Injectable()
export class PostService {

    public postList!: AngularFireList<any>;
    public selectPost: PostList = new PostList();

    constructor(private firebase: AngularFireDatabase) {
    }

    getPostLis()
    {
       return this.postList = this.firebase.list('PostListPrimary');
    }

    insertPost(post: PostList)
    {
        debugger;
        this.postList.push(
            {
                user: post.user,
                createTweet: post.createTweet,
                message: post.message,
            }
        );
    }

    updatePost(post: PostList, user: string)
    {
        this.postList.update(post.$key,post );
    }

    deletePost(post: PostList, user: string)
    {
        this.postList.remove(post.$key);
    }
}