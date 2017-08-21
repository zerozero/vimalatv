import {Component} from "@angular/core";
import {CmsDynamicPageComponent} from "../dynamicPage/dynamic.page.component";
import {DynamicPage} from "../dynamicPage/dynamic.page.model";
import {Artist} from "../artists/artist.model";
import {DynamicPageService} from "../dynamicPage/dynamic.page.service";
@Component({
    selector: 'cms-bio',
    templateUrl: '../dynamicPage/dynamic.page.component.html',
    styleUrls: ['../dynamicPage/dynamic.page.component.css']
})
export class CmsCollabComponent extends CmsDynamicPageComponent{


    ngOnInit(): void {

        this.endpoint = DynamicPageService.COLLAB_ENDPOINT;
        this._getPages();

        this._getAllArtists();
        // this._getUnusedArtists();
        this.sub = this.activatedRoute.data.subscribe(data => {
            console.log(data.type);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }


    protected _getPages():void {
        this._getPagesOfType(this.endpoint,false);
    }



    private getArtistName( id: string ):string{
        let artist: Artist = this.artists.find((artist) => {
            return artist.artist_id == id;
        });
        return artist ? artist.name : "";
    }

    private _getAllArtists():void {
        this.artistService
            .getAll()
            .subscribe((artists) => {
                this.artists = artists;
            });
    }

    // private _getUnusedArtists():void{
    //     this.unusedArtists = [];
    //     this.artists.forEach((artist) => {
    //         let id = artist.artist_id;
    //         //todo: search for existing collaborations with this artist id
    //     });
    // }


}