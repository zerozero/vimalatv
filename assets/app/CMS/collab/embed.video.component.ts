import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {VideoModel} from "../../Site/Collab/video.component";
import {IMediaModel, MediaType} from "../../Site/Collab/MediaModel";


@Component({
    selector: 'embed-video-component',
    template: `
        <div fxLayout="column" class="form-layout">
            <div fxFlex="16px"></div>
            <form fxFlex class="form-container" #f="ngForm" (ngSubmit)="onSubmit()">
                <p>
                    <md-input-container class="full-width">
                        <input mdInput type="text"
                               placeholder="youtube embed string"
                               [(ngModel)]="embedURL"
                               name="url">
                    </md-input-container>
                </p>
                <div fxlayout="row" fxLayoutAlign="end center">
                    <button md-raised-button
                            fxFlex="0 0 auto"
                            color="primary"
                            type="submit"
                            [disabled]="!f.form.valid">ADD</button>
                    <button md-raised-button
                            fxFlex="0 0 auto"
                            type="button"
                            (click)="onCancel()">RESET</button>
                </div>
            </form>
        </div>
    `,
    styles: [`
        .form-container{
            width: 100%;
        }

        .full-width {
            width: 100%;
        }
    `]
})
export class EmbedVideoComponent implements OnInit{


    @Output() OnVideoAdded: EventEmitter<MediaType> = new EventEmitter<MediaType>();

    data: IMediaModel;
    embedURL: string;



    constructor(){}

    ngOnInit(): void {
        // this.data = new MediaModel(null, MediaModel.VIDEO,'', null, null, null, 0,0);
        this.data = {
            media_id: null,
            type : MediaType.VIDEO,
            width: 0,
            height: 0
        }
    }

    onCancel(){

    }

    onSubmit(){

        let tmp = document.createElement('div');
        tmp.innerHTML = this.embedURL;
        let elem = tmp.getElementsByTagName('iframe')[0];

        this.data.url = elem['src'];
        this.data.width = parseInt(elem['width']);
        this.data.height = parseInt(elem['height']) ;
        this.OnVideoAdded.emit(this.data);
        this.data = {
            media_id: null,
            type : MediaType.VIDEO,
            width: 0,
            height: 0
        };
        this.embedURL = '';
    }

}