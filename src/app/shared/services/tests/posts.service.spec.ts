import { TestBed } from "@angular/core/testing";
import { PostsService } from './../posts.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientMock } from "../../mocks/services/http-client.mock";
import { of } from "rxjs";
import { PostsResponseMock } from "../../mocks/models/responses/posts.response.mock";

describe('PostsService', () => {

    let service: PostsService;
    let http: HttpClient;

    beforeEach(() => {
       TestBed.configureTestingModule({
           providers: [
               PostsService,
               { provide: HttpClient, useClass: HttpClientMock }
           ]
       }); 

       service = TestBed.inject(PostsService);
       http = TestBed.inject(HttpClient);
    });

    it('Should call the method "getPosts" and return a list of Posts', (done: DoneFn) => {
        spyOn(http, 'get').and.returnValue(of(PostsResponseMock));

        service.getPosts().subscribe(response => {
            expect(response.length).toBe(PostsResponseMock.length);
            expect(response[0].id).toBe(PostsResponseMock[0].id);
            
            done();
        });
    });
});