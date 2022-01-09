import { Observable, of } from "rxjs";
import { PostsResponseMock } from "../../models/responses/posts.response.mock";
import { IPostResponse } from '../../../interfaces/responses/post.response.interface';

export class PostsServiceMock {
    getPosts(): Observable<IPostResponse[]> {
        return of(PostsResponseMock);
    }
}