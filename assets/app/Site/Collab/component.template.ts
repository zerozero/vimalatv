import {ElementRef, ViewChild, ViewRef} from "@angular/core";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";

export interface IComponentTemplate {
    initialise( data: any, viewRef: ViewRef );
    OnMoveUp();
    OnMoveDown();
    OnDelete();
}


export class ComponentTemplate implements IComponentTemplate{

    data: any;
    viewRef: ViewRef;

    @ViewChild('content', {read: ElementRef}) _content: ElementRef;

    getContentHeight():string{
        return (this._content.nativeElement.offsetHeight-16)+"px";
    }

    constructor(private collabEditorService: CollabEditorService){

    }

    initialise( data: any, viewRef: ViewRef ){
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