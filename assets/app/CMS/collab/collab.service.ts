import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Collab} from "./collab.model";
import 'rxjs/add/operator/catch';

@Injectable()
export class CollabService{

    static ENDPOINT: string = '/collab/:id';

    collabs: Collab[] = [];

    constructor(@Inject(Http) private _http: Http) {
    }


    getAll():Observable<any> {

        let url: string = (CollabService.ENDPOINT
            .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const collabs = r.json().data;
                let transformedCollabs: Collab[] = [];
                for (let collab of collabs){
                    transformedCollabs.push( new Collab(collab._id, collab.artist_id, collab.templates, collab.enabled));
                }
                this.collabs = transformedCollabs;
                return transformedCollabs;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


    update( collab: Collab ):Observable<any>{
        let body = JSON.stringify(collab);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(CollabService.ENDPOINT
                .replace(':id', collab.collab_id), body, {headers})
            .map((r) => r.json());
    }

    add(collab: Collab ):Observable<any>{

        let body = JSON.stringify(collab);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(CollabService.ENDPOINT
                .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const collab = new Collab(result._id, result.artist_id,result.templates, result.enabled);
                this.collabs.push(collab);
                return collab;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    delete(collab: Collab):Observable<any> {
        this.collabs.splice(this.collabs.indexOf(collab), 1);
        return this._http
            .delete(CollabService.ENDPOINT
                .replace(':id', collab.collab_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }
}