import {Component, ElementRef, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../CMS/media/media.service";
import {MediaModel} from "../../CMS/media/media.model";
import {IMediaModel} from "../../CMS/media/imedia.model";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


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

    public selectedVideo: IMediaModel;

    private sub: any;

    private spotifyUrl: string = "https://soundcloud.com/jon-rowe-8/sets/midnight-diner";

    constructor(private router:Router,
                private route: ActivatedRoute,
                private mediaService:MediaService,
                private el: ElementRef,
                public dialog: MdDialog){

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
                this.selectedVideo = this.mediaSources[0];
            });
    }

    PlayVideo(mediaModel:IMediaModel){
        this.selectedVideo = mediaModel;
    }



}


/*

 MODAL VIDEO PLAYER

 */
@Component({
    selector: 'modal-video-player',
    template: `
        <div fxFlex fxLayout="row" fxFlexAlign="center center">
            <!--<div fxFlex="1 1 auto" #content>-->
                <div fxFlex="0 1 auto">
                    <iframe [src]="safeResourceURL"
                            frameborder="0"
                            allowfullscreen class="video"></iframe>
                </div>

            <!--</div>-->
        </div>
    `,
    styles: [
            `
            .video-panel{
                width: 90vw;
                height: 80vh;
            }
            .container {
                position: relative;
                /*width: 560px;*/
                /*height: 315px;*/
                width: 100%;
                /*height: 0;*/
                padding-bottom: 56.25%;
            }
            .video {
                position: absolute;
                top: 10%;
                left: 10%;
                width: 80%;
                height: 80%;
            }

            :host {
                display: block;
                width: 80vw;
                height: 80vh;
            }
        `
    ]
})
export class ModalVideoPlayer {


    safeResourceURL: SafeResourceUrl;

    constructor(public dialogRef: MdDialogRef<ModalVideoPlayer>,
                @Inject(MD_DIALOG_DATA)
                public data: IMediaModel,
                private sanitizer: DomSanitizer) {

        this.safeResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
    }


}