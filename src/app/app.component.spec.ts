import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from './app.component';
import { PostsServiceMock } from "./shared/mocks/services/posts/posts.service.mock";
import { PostsService } from "./shared/services/posts.service";
import { PostsEmptyServiceMock } from './shared/mocks/services/posts/posts-empty.service.mock';
import { PostsError500ServiceMock } from "./shared/mocks/services/posts/posts-error-500.service.mock";

fdescribe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    const useDefaultPostsService = () => {
        TestBed.overrideProvider(PostsService, { useValue: new PostsServiceMock() });

        loadComponent();
    };

    const usePostsEmptyService = () => {
        TestBed.overrideProvider(PostsService, { useValue: new PostsEmptyServiceMock() });

        loadComponent();
    };

    const usePostsError500Service = () => {
        TestBed.overrideProvider(PostsService, { useValue: new PostsError500ServiceMock() });

        loadComponent();
    };

    const loadComponent = () => {
        TestBed.compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: PostsService, useClass: PostsServiceMock }
            ]
        });
    });

    it('should return the posts response', () => {
        useDefaultPostsService();

        fixture.detectChanges();

        expect(component.posts.length).toBeGreaterThan(0);
    });

    it('should return an empty array of posts response', () => {
        usePostsEmptyService();

        fixture.detectChanges();

        expect(component.posts.length).toBe(0);
    });

    it('should treat the http error response (500)', () => {
        usePostsError500Service();

        fixture.detectChanges();

        expect(component.posts.length).toBe(0);
        expect(component.gotError).toBe(true);
    });
});