import {Component, OnInit} from "@angular/core";
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
                               [(ngModel)]="data.youtubeURL"
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

    data = {
        youtubeURL: ''
    }

    constructor(){}

    ngOnInit(): void {
    }

    onCancel(){

    }

    onSubmit(){

    }

}