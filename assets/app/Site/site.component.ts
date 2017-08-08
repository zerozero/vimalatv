import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ArtistService} from "../CMS/artists/artist.service";
import {Artist} from "../CMS/artists/artist.model";
import {CollabEditorService} from "../CMS/collab/collab.editor.service";
import {MediaService} from "../CMS/media/media.service";
import {MediaType} from "./Collab/MediaModel";

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.css'],
    providers: [CollabEditorService]        //needed for collab.component
})

export class SiteComponent implements OnInit{


//note this class must be defined in the global css file
    classes : string = 'flat-menu-panel';

    artists: Artist[] = [];

    public typeVideo: string = MediaType.VIDEO;
    public typeAudio: string = MediaType.AUDIO;

    constructor(private router:Router,
                private artistService:ArtistService){

    }


    ngOnInit(): void {
        this._getAll();
    }

    _getAll(){
        this.artistService
            .getAll()
            .subscribe((artists) => {
                this.artists = artists;
            })
    }

    showCollaboration(artist: Artist){
        this.router.navigateByUrl('/collab/'+artist.artist_id);
    }

    showMedia(type: string){
        this.router.navigateByUrl('/media/'+type);
    }

    navigateToRoute(route: string){
        this.router.navigateByUrl(route);
    }
}