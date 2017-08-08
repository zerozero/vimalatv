import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {IMediaModel} from "../../Site/Collab/MediaModel";
import 'rxjs/add/operator/catch';

@Injectable()
export class MediaService{

    static ENDPOINT: string = '/__media/:id';

    mediaSources: IMediaModel[] = [];

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll():Observable<any> {

        let url: string = (MediaService.ENDPOINT
            .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const sources = r.json().data;
                let transformedSources: IMediaModel[] = [];
                for (let source of sources){

                    let data: IMediaModel = {
                        media_id: null,
                        type : source.type,
                        url: source.url,
                        title: source.title,
                        enabled: source.enabled
                    };

                    transformedSources.push( data );
                }
                this.mediaSources = transformedSources;
                return transformedSources;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getAllEnabled():Observable<any> {

        let url: string = (MediaService.ENDPOINT
            .replace('/:id', '?filterDisabled=true'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const sources = r.json().data;
                let transformedSources: IMediaModel[] = [];
                for (let source of sources){
                    let data: IMediaModel = {
                        media_id: null,
                        type : source.type,
                        url: source.url,
                        title: source.title,
                        enabled: source.enabled
                    };

                    transformedSources.push( data );
                }
                this.mediaSources = transformedSources;
                return transformedSources;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }



    update( source: IMediaModel ):Observable<any>{
        let body = JSON.stringify(source);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(MediaService.ENDPOINT
                .replace(':id', source.media_id), body, {headers})
            .map((r) => r.json());
    }

    add(source: IMediaModel ):Observable<any>{

        let body = JSON.stringify(source);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(MediaService.ENDPOINT
                .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                let media: IMediaModel = {
                    media_id: null,
                    type : source.type,
                    url: source.url,
                    title: source.title,
                    enabled: source.enabled
                };
                this.mediaSources.push(media);
                return media;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    delete(source: IMediaModel):Observable<any> {
        this.mediaSources.splice(this.mediaSources.indexOf(source), 1);
        return this._http
            .delete(MediaService.ENDPOINT
                .replace(':id', source.media_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }
}