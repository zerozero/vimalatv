import {Component} from "@angular/core";
import {CmsDynamicPageComponent, IDynamicPage} from "../dynamicPage/dynamic.page.component";
import {DynamicPage} from "../dynamicPage/dynamic.page.model";
import {Artist} from "../artists/artist.model";
import {DynamicPageService} from "../dynamicPage/dynamic.page.service";
import {ICategory} from "../dynamicPage/category";
@Component({
    selector: 'cms-bio',
    templateUrl: '../dynamicPage/dynamic.page.component.html',
    styleUrls: ['../dynamicPage/dynamic.page.component.css']
})
export class CmsCollabComponent extends CmsDynamicPageComponent implements IDynamicPage{


    artists: Artist[] = [];

    ngOnInit(): void {

        this.endpoint = DynamicPageService.COLLAB_ENDPOINT;
        this._getPages();
        this._getAllArtists();
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



    getPreview( id: string ):string{
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
                artists.forEach((artist) => {
                    let cat:ICategory = {
                        title:artist.name,
                        id:artist.artist_id
                    };
                    this.categories.push(cat);
                })
            });
    }




}