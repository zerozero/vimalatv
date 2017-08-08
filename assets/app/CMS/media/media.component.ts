import {Component, OnInit} from "@angular/core";
import {IMediaModel, MediaType} from "../../Site/Collab/MediaModel";
@Component({
    selector: 'cms-media',
    templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit{

    mediaSources: IMediaModel[] = [];

    ngOnInit(){

        let audiodata: IMediaModel = {
            media_id: null,
            type : MediaType.AUDIO,
            url: "https://soundcloud.com/jon-rowe-8/sets/midnight-diner",
            title: "soundcloud",
            enabled: false
        };

        this.mediaSources.push( audiodata );
        this.mediaSources.push( audiodata );

        let videodata: IMediaModel = {
            media_id: null,
            type : MediaType.VIDEO,
            url: "https://soundcloud.com/jon-rowe-8/sets/midnight-diner",
            title: "video",
            enabled: false
        };

        this.mediaSources.push( videodata );
        this.mediaSources.push( videodata );
    }

    changeEnabled(source:any, enabled: boolean){

        // artist.enabled = enabled;
        // this.update(artist);
    }

    createAudioSource(){

    }

    createVideoSource(){

    }

    //===========   AUDIO   =============//

    editAudioSource(){

    }

    deleteAudioSource(){

    }


    //===========   VIDEO   =============//

    editVideoSource(){

    }

    deleteVideoSource(){

    }
}