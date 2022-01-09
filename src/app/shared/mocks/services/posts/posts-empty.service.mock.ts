import { Observable, of } from "rxjs";
import { IPostResponse } from './../../../interfaces/responses/post.response.interface';

export class PostsEmptyServiceMock {
    getPosts(): Observable<IPostResponse[]> {
        return of([]);
    }
}