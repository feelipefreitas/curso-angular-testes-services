import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewPostsService } from "../new-posts.service";
import { PostsResponseMock } from "../../mocks/models/responses/posts.response.mock";
import { HttpRequest } from "@angular/common/http";

describe('NewPostsService', () => {
    let httpTestingController: HttpTestingController;
    let service: NewPostsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                NewPostsService
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(NewPostsService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('Should call the method "getPosts" and return a list of Posts', () => {
        service.getPosts().subscribe(
            response => expect(response).toEqual(PostsResponseMock)
        );

        const request = httpTestingController.expectOne(
            (req: HttpRequest<any>) => req.url.includes('/posts')
        );
        expect(request.request.method).toBe('GET');

        request.flush(PostsResponseMock, { status: 200, statusText: 'Success' });
    });

    it('Should fail the http call and return an empty array', () => {
        service.getPosts().subscribe(
            response => expect(response).toEqual([])
        );

        const request = httpTestingController.expectOne(service.url);
        expect(request.request.method).toBe('GET');

        request.flush('Erro', { status: 404, statusText: 'Not Found' });
    });

    it('Should increase the times property when calling the "getPosts" multiple times', () => {
        service.getPosts().subscribe();
        service.getPosts().subscribe(
            response => expect(service.times).toBe(2)
        );

        const requests = httpTestingController.match(service.url);
        expect(requests.length).toBe(2);

        requests[0].flush(PostsResponseMock);
        requests[1].flush(PostsResponseMock);
    });
});