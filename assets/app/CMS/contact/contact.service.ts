import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Contact} from "./contact.model";
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService{

    static ENDPOINT: string = '/__contact/:id';

    contact: Contact;

    constructor(@Inject(Http) private _http: Http) {
    }



    getOne():Observable<any> {

        let url: string = (ContactService.ENDPOINT
            .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const result = r.json().data;
                if (result){
                    let transformedContact: Contact = new Contact(
                        result._id,
                        result.twitterUrl,
                        result.fbUrl,
                        result.instaUrl,
                        result.email
                    );
                    return transformedContact;
                }
                return null;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }




    update( contact: Contact ):Observable<any>{
        let body = JSON.stringify(contact);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(ContactService.ENDPOINT
                .replace(':id', contact.id), body, {headers})
            .map((r) => r.json());
    }

    add(contact: Contact ):Observable<any>{

        let body = JSON.stringify(contact);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(ContactService.ENDPOINT
                .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const contact = new Contact(result._id,
                    result.twitterUrl,
                    result.fbUrl,
                    result.instaUrl,
                    result.email);
                this.contact = contact;
                return contact;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    // delete(contact: Contact):Observable<any> {
    //     this.contacts.splice(this.contacts.indexOf(contact), 1);
    //     return this._http
    //         .delete(ContactService.ENDPOINT
    //             .replace(':id', contact.id))
    //         .map((response:Response) => response.json)
    //         .catch((error:Response) => Observable.throw(error.json()));
    // }
}