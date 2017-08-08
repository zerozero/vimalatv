import {ElementRef, OnChanges, SimpleChanges, ViewChild, ViewRef} from "@angular/core";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {IMediaModel, MediaType} from "./MediaModel";

export interface IComponentTemplate {
    initialise( data: IMediaModel, viewRef: ViewRef );
    OnMoveUp();
    OnMoveDown();
    OnDelete();
}


export class ComponentTemplate implements IComponentTemplate{

    data: IMediaModel;
    viewRef: ViewRef;
    isEditMode: boolean = false;
    contentHeight: string = "0px";

    @ViewChild('content', {read: ElementRef}) _content: ElementRef;
    @ViewChild('widgets') widgets: any;

    constructor(private collabEditorService: CollabEditorService){

    }


    initialise( data: IMediaModel, viewRef: ViewRef ){
        this.data = data;
        this.viewRef = viewRef;
    }

    OnMoveUp(){
        this.collabEditorService.moveUp(this.viewRef);
    }

    OnMoveDown(){
        this.collabEditorService.moveDown(this.viewRef);
    }

    OnEditMe(){
        //todo: implement editing
        console.log("edit me!!!");
    }

    OnDelete(){
        this.collabEditorService.delete(this.viewRef);
    }

}