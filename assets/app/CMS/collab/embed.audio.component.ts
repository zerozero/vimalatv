import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MediaModel} from "../media/media.model";
import {IMediaModel} from "../media/imedia.model";

@Component({
    selector: 'embed-audio-component',
    template: `
        <div fxLayout="column" class="form-layout">
            <div fxFlex="16px"></div>
            <form fxFlex class="form-container" #f="ngForm" (ngSubmit)="onSubmit()">
                <p>
                    <md-input-container class="full-width">
                        <input mdInput type="text"
                               placeholder="soundcloud embed string"
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
export class EmbedAudioomponent implements OnInit{

    @Output() OnAudioAdded: EventEmitter<IMediaModel> = new EventEmitter<IMediaModel>();

    data : IMediaModel;
    embedURL: string;

    constructor(){}

    ngOnInit(): void {
        // this.data = new AudioModel(null,'');
        this.data = {
            media_id: null,
            type : MediaModel.AUDIO
        };
    }

    onCancel(){

    }

    onSubmit(){
        console.log(this.embedURL);

        var tmp = document.createElement('div');
        tmp.innerHTML = this.embedURL;
        var elem = tmp.getElementsByTagName('iframe')[0];

        this.data.url = elem['src'];
        this.OnAudioAdded.emit(this.data);

        // this.data = new AudioModel(null,'');
        this.data = {
            media_id: null,
            type : MediaModel.AUDIO
        };
    }

}