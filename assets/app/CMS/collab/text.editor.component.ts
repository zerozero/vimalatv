import {Component, OnInit} from "@angular/core";
@Component({
    selector: 'text-editor-component',
    template: `
        <form class="text-container" #f="ngForm" (ngSubmit)="onSubmit()">
            <p>
                <md-input-container class="full-width">
                    <textarea mdInput
                              placeholder="Title"
                              [(ngModel)]="data.title"
                              name="title">
                    </textarea>
                </md-input-container>
            </p>
            <p>
                <md-input-container class="full-width">
                    <textarea mdInput
                              placeholder="Body Text"
                              mdTextareaAutosize
                              [minRows]="6"
                              [maxRows]="8"
                              required
                              [(ngModel)]="data.body"
                              name="body">
                    </textarea>
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
                        (click)="onReset()">RESET</button>
            </div>
        </form>
    `,
    styles: [`
        .text-container{
            width: 100%;
        }

        .full-width {
            width: 100%;
        }
    `]
})

export class TextEditorComponent implements OnInit{


    data = {
        title:'',
        body:''
    }

    constructor(){}

    ngOnInit(): void {
    }

    onReset(){

    }

    onSubmit(){

    }
}