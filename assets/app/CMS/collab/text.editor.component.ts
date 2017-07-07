import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {TextModel} from "../../Site/Collab/text.component";
@Component({
    selector: 'text-editor-component',
    template: `
        <div fxLayout="column" class="form-layout">
            <div fxFlex="16px"></div>
            <form fxFlex class="form-container" #f="ngForm" (ngSubmit)="onSubmit()">
                <p>
                    <md-input-container class="full-width">
                        <textarea mdInput
                                  mdTextareaAutosize
                                  [minRows]="1"
                                  [maxRows]="2"
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
                                  [minRows]="3"
                                  [maxRows]="5"
                                  required
                                  [(ngModel)]="data.content"
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
        </div>
        
    `,
    styles: [`
        .form-layout{
        
        }
        .form-container{
            width: 100%;
        }
        .full-width {
            width: 100%;
        }
    `]
})

export class TextEditorComponent implements OnInit{

    @Output() OnTextAdded = new EventEmitter<TextModel>();

    data: TextModel;

    constructor(){}

    ngOnInit(): void {
        this.data = new TextModel(null,'','');
    }

    onReset(){

    }

    onSubmit(){
        this.OnTextAdded.emit(this.data);
        this.data = new TextModel(null,'','');
    }
}