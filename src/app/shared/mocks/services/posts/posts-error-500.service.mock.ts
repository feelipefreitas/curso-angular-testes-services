import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { IPostResponse } from './../../../interfaces/responses/post.response.interface';

export class PostsError500ServiceMock {
    getPosts(): Observable<IPostResponse[]> {
        return throwError(
            new HttpErrorResponse({
                status: 500,
                error: {
                    message: 'Error 500'
                }
            })
        );
    }
}