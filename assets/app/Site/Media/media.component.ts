import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../CMS/media/media.service";
import {MediaModel} from "../../CMS/media/media.model";
import {IMediaModel} from "../../CMS/media/imedia.model";


@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit{

    public typeVideo: string = MediaModel.VIDEO;
    public typeAudio: string = MediaModel.AUDIO;

    public mediaType: string;
    private media: any;

    public mediaSources: IMediaModel[] = [];

    private sub: any;

    private spotifyUrl: string = "https://soundcloud.com/jon-rowe-8/sets/midnight-diner";

    constructor(private router:Router,
                private route: ActivatedRoute,
                private mediaService:MediaService){

    }


    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (params.type !== this.mediaType)
                this._getMediaOfType(params.type);
            this.mediaType = params.type;
        });

    }

    _getMediaOfType( type: string ){
        this.mediaService
            .getMediaOfType(type)
            .subscribe((sources) => {
                this.mediaSources = sources;
            });
    }


}