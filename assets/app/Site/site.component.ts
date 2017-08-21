import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {ArtistService} from "../CMS/artists/artist.service";
import {Artist} from "../CMS/artists/artist.model";
import {DynamicPageEditorService} from "../CMS/dynamicPage/page.editor.service";
import {MediaService} from "../CMS/media/media.service";
import {MediaModel} from "../CMS/media/media.model";
import {MdSidenav} from "@angular/material";
import {DynamicPageService} from "../CMS/dynamicPage/dynamic.page.service";
import {DynamicPage} from "../CMS/dynamicPage/dynamic.page.model";


@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.css'],
    providers: [DynamicPageEditorService]        //needed for collab.component
})

export class SiteComponent implements OnInit{


    @ViewChild('sidenav', {read: MdSidenav}) _sidenav: MdSidenav;

    //note this class must be defined in the global css file
    classes : string = 'flat-menu-panel';

    artists: Artist[] = [];
    collabs:DynamicPage[] = [];

    public typeVideo: string = MediaModel.VIDEO;
    public typeAudio: string = MediaModel.AUDIO;

    constructor(private router:Router,
                private collabService:DynamicPageService,
                private artistService:ArtistService){

    }


    ngOnInit(): void {
        this._getArtists();
    }

    _getArtists() {
        this.artistService
            .getAll()
            .subscribe((artists) => {
                this.artists = artists;
                this._getCollabs();
            });
    }

    _getCollabs(){

        this.collabService
            .getAll(true)
            .subscribe((collabs) => {
                this.collabs = collabs;
            });
    }

    getArtist(artist_id:string):string{
        var result = this.artists.filter(function( artist ) {
            return artist.artist_id == artist_id;
        });
        return result ? result[0].name : "not found";
    }

    showCollaboration(collab: DynamicPage){
        this._sidenav.close();
        this.router.navigateByUrl('/collab/'+collab.artist_id);
    }

    showMedia(type: string){
        this._sidenav.close();
        this.router.navigateByUrl('/media/'+type);
    }

    navigateToRoute(route: string){
        this.router.navigateByUrl(route);
    }
}