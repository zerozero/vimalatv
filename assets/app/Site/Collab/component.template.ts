import {ElementRef, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild, ViewRef} from "@angular/core";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {IMediaModel} from "../../CMS/media/imedia.model";


export interface IComponentTemplate {
    isEditMode;
    OnEditItem;
    initialise( data: IMediaModel, viewRef: ViewRef );
    OnMoveUp();
    OnMoveDown();
    OnDelete();
}


export class ComponentTemplate implements IComponentTemplate{

    @Output() OnEditItem: EventEmitter<IMediaModel> = new EventEmitter<IMediaModel>();

    data: IMediaModel;
    viewRef: ViewRef;
    isEditMode: boolean = false;

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
        this.OnEditItem.emit(this.data);
    }

    OnDelete(){
        this.collabEditorService.delete(this.viewRef);
    }

}