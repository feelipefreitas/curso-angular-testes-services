import { Component, OnInit } from '@angular/core';
import { PostCommentsService } from './shared/services/post-comments.service';
import { PostsService } from './shared/services/posts.service';
import { IPostResponse } from './shared/interfaces/responses/post.response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: IPostResponse[] = [];
  gotError = false;

  constructor(
    private _postsService: PostsService
  ) { }

  ngOnInit(): void {
    console.log('On Init');

    this._postsService.getPosts().subscribe(
      postsResponse => {

        this.posts = postsResponse;
      },
      (error: HttpErrorResponse) => {
        this.gotError = true;
        this.posts = [];
      }
    );
  }
}
