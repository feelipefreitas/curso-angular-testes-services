import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { IPostResponse } from "../interfaces/responses/post.response.interface";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewPostsService { 
    times = 0;
    url = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private _http: HttpClient) { }

    getPosts(): Observable<IPostResponse[]> {
        this.times += 1;
        
        return this._http.get<IPostResponse[]>(this.url).pipe(
            catchError(() => {
                return of([])
            })
        );
    }
}