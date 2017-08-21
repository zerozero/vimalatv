import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {DynamicPageEditorService} from "./page.editor.service";
import { MediaModel} from "../media/media.model";
import {IMediaModel} from "../media/imedia.model";

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
                                  [mdAutosizeMinRows]="1"
                                  [mdAutosizeMaxRows]="2"
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
                                  [mdAutosizeMinRows]="3"
                                  [mdAutosizeMaxRows]="3"
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

    @Output() OnTextAdded: EventEmitter<IMediaModel> = new EventEmitter<IMediaModel>();

    data: IMediaModel;

    private isEditing: boolean = false;

    constructor(private collabEditorService: DynamicPageEditorService){}

    ngOnInit(): void {

        this.data = {
            media_id: null,
            type : MediaModel.TEXT
        };
    }

    editMedia( data:IMediaModel){
        this.isEditing = true;
        this.data = data;
    }

    onReset(){

    }

    onSubmit(){
        //only emit if it's a new piece of data
        if (!this.isEditing)
            this.OnTextAdded.emit(this.data);

        this.isEditing = false;
        this.data = {
            media_id: null,
            type : MediaModel.TEXT
        };
    }
}