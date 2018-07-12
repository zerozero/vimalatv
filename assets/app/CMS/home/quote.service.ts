import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import {Quote} from "./quote.model";

@Injectable()
export class QuotesService{

    static ENDPOINT: string = '/__quote/:id';

    quotes: Quote[] = [];

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll():Observable<any> {

        let url: string = (QuotesService.ENDPOINT
            .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const quotes = r.json().data;
                let transformedQuotes: Quote[] = [];
                for (let quote of quotes){
                    transformedQuotes.push( new Quote(quote._id, quote.text, quote.enabled, quote.stars));
                }
                this.quotes = transformedQuotes;
                return transformedQuotes;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getAllEnabled():Observable<any> {

        let url: string = (QuotesService.ENDPOINT
            .replace('/:id', '?filterDisabled=true'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const quotes = r.json().data;
                let transformedQuotes: Quote[] = [];
                for (let quote of quotes){
                    transformedQuotes.push( new Quote(quote._id, quote.text,quote.enabled, quote.stars));
                }
                this.quotes = transformedQuotes;
                return transformedQuotes;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


    update( quote: Quote ):Observable<any>{
        let body = JSON.stringify(quote);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(QuotesService.ENDPOINT
                .replace(':id', quote.quote_id), body, {headers})
            .map((r) => r.json());
    }

    add(quote: Quote ):Observable<any>{

        let body = JSON.stringify(quote);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(QuotesService.ENDPOINT
                .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const quote = new Quote(result._id, result.text, result.enabled,result.stars);
                this.quotes.push(quote);
                return quote;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    delete(quote: Quote):Observable<any> {
        this.quotes.splice(this.quotes.indexOf(quote), 1);
        return this._http
            .delete(QuotesService.ENDPOINT
                .replace(':id', quote.quote_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }
}