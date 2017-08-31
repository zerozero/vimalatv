import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {DynamicPage} from "./dynamic.page.model";
import 'rxjs/add/operator/catch';

@Injectable()
export class DynamicPageService{

    static ENDPOINT: string = '/__page/:id';

    public static BIO_ENDPOINT: string = '__page/bio/:id';
    public static COLLAB_ENDPOINT: string = '__page/collab/:id';
    public static REVIEWS_ENDPOINT: string = '__page/reviews/:id';

    pages: DynamicPage[] = [];

    constructor(@Inject(Http) private _http: Http) {
    }


    getPages(endpoint: string, filterDisabled:boolean = false):Observable<any> {
        let url: string = (endpoint
            .replace('/:id', '?filterDisabled='+(filterDisabled ? 'true' : 'false')));

        return this._http
            .get(url)
            .map((r:Response) => {
                const pages = r.json().data;
                let transformedPages: DynamicPage[] = [];
                for (let page of pages){
                    transformedPages.push( new DynamicPage(page._id, page.artist_id, page.templates, page.enabled));
                }
                this.pages = transformedPages;
                return transformedPages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getOnePage( endpoint: string, id:string ):Observable<any> {

        let url: string = (endpoint
            .replace(':id', id));

        return this._http
            .get(url)
            .map((r:Response) => {
                const pages = r.json().data;
                let transformedPages: DynamicPage[] = [];
                for (let page of pages){
                    transformedPages.push( new DynamicPage(page._id, page.artist_id, page.templates, page.enabled));
                }
                this.pages = transformedPages;
                return transformedPages;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    addPage(endpoint: string, page: DynamicPage ):Observable<any>{

        let body = JSON.stringify(page);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(endpoint
                .replace('/:id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const page = new DynamicPage(result._id, result.artist_id,result.templates, result.enabled);
                this.pages.push(page);
                return page;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    updatePage( endpoint:string, page: DynamicPage ):Observable<any>{
        let body = JSON.stringify(page);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(endpoint
                .replace(':id', page.page_id), body, {headers})
            .map((r) => r.json());
    }

    deletePage( endpoint:string, page: DynamicPage ):Observable<any>{
        this.pages.splice(this.pages.indexOf(page), 1);
        return this._http
            .delete(endpoint
                .replace(':id', page.page_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }





    getAll(filterDisabled:boolean = false):Observable<any> {

        let url: string = (DynamicPageService.ENDPOINT
            .replace('/:id', '?filterDisabled='+(filterDisabled ? 'true' : 'false')));

        return this._http
            .get(url)
            .map((r:Response) => {
                const pages = r.json().data;
                let transformedPages: DynamicPage[] = [];
                for (let page of pages){
                    transformedPages.push( new DynamicPage(page._id, page.artist_id, page.templates, page.enabled));
                }
                this.pages = transformedPages;
                return transformedPages;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getOne( id:string ):Observable<any> {

        let url: string = (DynamicPageService.ENDPOINT
            .replace(':id', id));

        return this._http
            .get(url)
            .map((r:Response) => {
                const pages = r.json().data;
                let transformedPages: DynamicPage[] = [];
                for (let page of pages){
                    transformedPages.push( new DynamicPage(page._id, page.artist_id, page.templates, page.enabled));
                }
                this.pages = transformedPages;
                return transformedPages;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


    update( page: DynamicPage ):Observable<any>{
        let body = JSON.stringify(page);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(DynamicPageService.ENDPOINT
                .replace(':id', page.page_id), body, {headers})
            .map((r) => r.json());
    }

    add(page: DynamicPage ):Observable<any>{

        let body = JSON.stringify(page);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(DynamicPageService.ENDPOINT
                .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const page = new DynamicPage(result._id, result.artist_id,result.templates, result.enabled);
                this.pages.push(page);
                return page;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    delete(page: DynamicPage):Observable<any> {
        this.pages.splice(this.pages.indexOf(page), 1);
        return this._http
            .delete(DynamicPageService.ENDPOINT
                .replace(':id', page.page_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }
}