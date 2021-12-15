import { Component, OnInit } from '@angular/core';
import { PostCommentsService } from './shared/services/post-comments.service';
import { PostsService } from './shared/services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _postsService: PostsService,
    private _postCommentsService: PostCommentsService
  ) { }

  ngOnInit(): void {
    console.log('On Init');

    this._postsService.getPosts().subscribe(postsResponse => {
      console.log('POSTS RESPONSE');
      console.log(postsResponse);
    });

    this._postsService.getPostById(1).subscribe(postResponse => {
      console.log('POST RESPONSE');
      console.log(postResponse);
    });

    this._postCommentsService.getPostComments(2).subscribe(commentsResponse => {
      console.log('COMMENTS RESPONSE');
      console.log(commentsResponse);
    });
  }
}
