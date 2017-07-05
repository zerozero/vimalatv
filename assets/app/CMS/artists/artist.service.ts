import {Inject, Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Artist} from "./artist.model";

@Injectable()
export class ArtistService{

    static ENDPOINT: string = '/artist/:id';

    artists: Artist[] = [];

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll():Observable<any> {

        let url: string = (ArtistService.ENDPOINT
            .replace('/:id', '?filterDisabled=false'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const artists = r.json().data;
                let transformedArtists: Artist[] = [];
                for (let artist of artists){
                    transformedArtists.push( new Artist(artist._id, artist.name, artist.enabled));
                }
                this.artists = transformedArtists;
                return transformedArtists;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getAllEnabled():Observable<any> {

        let url: string = (ArtistService.ENDPOINT
            .replace('/:id', '?filterDisabled=true'));

        return this._http
            .get(url)
            .map((r:Response) => {
                const artists = r.json().data;
                let transformedArtists: Artist[] = [];
                for (let artist of artists){
                    transformedArtists.push( new Artist(artist._id, artist.name,artist.enabled));
                }
                this.artists = transformedArtists;
                return transformedArtists;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getAllAfterDate( date: Date ):Observable<any> {

        console.log(date.toISOString());
        let url: string = (ArtistService.ENDPOINT
            .replace(':id', date.toISOString()));

        return this._http
            .get(url)
            .map((r:Response) => {
                const artists = r.json().data;
                let transformedArtists: Artist[] = [];
                for (let artist of artists){
                    transformedArtists.push( new Artist(artist._id,artist.name,artist.enabled));
                }
                this.artists = transformedArtists;
                return transformedArtists;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


    update( artist: Artist ):Observable<any>{
        let body = JSON.stringify(artist);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .patch(ArtistService.ENDPOINT
                .replace(':id', artist.artist_id), body, {headers})
            .map((r) => r.json());
    }

    add(artist: Artist ):Observable<any>{

        let body = JSON.stringify(artist);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(ArtistService.ENDPOINT
                .replace(':id', ''), body, {headers})
            .map((response: Response) => {
                const result = response.json().data;
                const artist = new Artist(result._id, result.name, result.enabled);
                this.artists.push(artist);
                return artist;
            })
            .catch((error:Response) => Observable.throw(error.json()));


    }

    delete(artist: Artist):Observable<any> {
        this.artists.splice(this.artists.indexOf(artist), 1);
        return this._http
            .delete(ArtistService.ENDPOINT
                .replace(':id', artist.artist_id))
            .map((response:Response) => response.json)
            .catch((error:Response) => Observable.throw(error.json()));
    }
}