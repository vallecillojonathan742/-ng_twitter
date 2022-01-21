import {Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { PostListSecondary } from '../models/post-list-secondary';

@Injectable()
export class PostSecondaryService {

    public postList!: AngularFireList<any>;
    public selectPost: PostListSecondary = new PostListSecondary();

    constructor(private firebase: AngularFireDatabase) {
    }

    getPostLis()
    {
       return this.postList = this.firebase.list('PostListSecondary');
    }

    insertPost(post: PostListSecondary)
    {
        this.postList.push(
            {
                user: post.user,
                createTweet: post.createTweet,
                message: post.message,
                keyFK: post.keyFK
            }
        );
    }
}