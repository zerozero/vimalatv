import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Gig} from "./gig.model";
import 'rxjs/add/operator/catch';

@Injectable()
export class GigService{

    static ENDPOINT: string = '/__gig/:id';

    gigs: Gig[] = [];

    constructor(@Inject(Http) private _http: Http) {
    }

    hasTicketURL( gig: Gig ){
        return !(gig.ticketUrl == '' || gig.ticketUrl == null || gig.ticketUrl == undefined);
    }

    hasWebsite( gig: Gig ){
        return !(gig.website == '' || gig.website == null || gig.website == undefined);
    }

    gotoWebsite(gig:Gig){
        let url: string = '';
        if (!/^http[s]?:\/\//.test(gig.website)) {
            url += 'http://';
        }

        url += gig.website;
        window.open(url, '_blank');
    }

    buyTickets(gig : Gig ){
        let url: string = '';
        if (!/^http[s]?:\/\//.test(gig.ticketUrl)) {
            url += 'http://';
        }

        url += gig.ticketUrl;
        window.open(url, '_blank');
    }


    getAll():Observable<any> {

        let url: string = (GigService.ENDPOINT
                .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const gigs = r.json().data;
                let transformedGigs: Gig[] = [];
                for (let gig of gigs){
                    transformedGigs.push( new Gig(gig._id, new Date(gig.date), gig.venue,gig.description, gig.enabled, gig.permanent, gig.website, gig.ticketUrl));
                }
                this.gigs = transformedGigs;
                return transformedGigs;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getAllEnabled():Observable<any> {

        let url: string = (GigService.ENDPOINT
            .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const gigs = r.json().data;
                let transformedGigs: Gig[] = [];
                for (let gig of gigs){
                    transformedGigs.push( new Gig(gig._id, new Date(gig.date), gig.venue,gig.description, gig.enabled, gig.permanent, gig.website, gig.ticketUrl));
                }
                this.gigs = transformedGigs;
                return transformedGigs;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getAllAfterDate( date: Date ):Observable<any> {

        console.log(date.toISOString());
        let url: string = (GigService.ENDPOINT
            .replace(':id', date.toISOString()));

        return this._http
            .get(url)
            .map((r:Response) => {
                const gigs = r.json().data;
                let transformedGigs: Gig[] = [];
                for (let gig of gigs){
                    transformedGigs.push( new Gig(gig._id, new Date(gig.date), gig.venue,gig.description, gig.enabled, gig.permanent, gig.website, gig.ticketUrl));
                }
                this.gigs = transformedGigs;
                return transformedGigs;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


    update( gig: Gig ):Observable<any>{
        let body = JSON.stringify(gig);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(GigService.ENDPOINT
            .replace(':id', gig.gig_id), body, {headers})
            .map((r) => r.json());
    }

    add(gig: Gig ):Observable<any>{

        let body = JSON.stringify(gig);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(GigService.ENDPOINT
            .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const gig = new Gig(result._id, new Date(result.date), result.venue,result.description, result.enabled, result.permanent, result.website, result.ticketUrl);
                this.gigs.push(gig);
                return gig;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    delete(gig: Gig):Observable<any> {
        this.gigs.splice(this.gigs.indexOf(gig), 1);
        return this._http
            .delete(GigService.ENDPOINT
            .replace(':id', gig.gig_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }
}