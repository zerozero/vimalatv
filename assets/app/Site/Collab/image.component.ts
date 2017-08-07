import {Component, ElementRef, ViewChild} from "@angular/core";
import {ComponentTemplate} from "./component.template";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'app-image',
    template: `
        <collab-widgets #widgets
                        (OnMoveUp)="OnMoveUp()"
                        (OnMoveDown)="OnMoveDown()"
                        (OnDelete)="OnDelete()"
                        (OnEdit)="OnEditMe()"
                        class="floating-widgets" *ngIf="isEditMode"></collab-widgets>
        <div (mouseenter)="widgets?.OnMouseEnter($event)" 
             (mouseleave)="widgets?.OnMouseLeave($event)">
            <div #content fxFlex fxLayout="column" fxLayoutGap="10px" class="image-component">
                <h4 *ngIf="data.title != undefined">{{data.title}}</h4>
                <div class="image-container">
                    <img src="{{data.url}}" class="image-resize"/>                    
                </div>
                <p *ngIf="data.caption != undefined">{{data.caption}}</p>
            </div>
        </div>
    `,
    styles: [`
        .floating-widgets {
            height: 0;
            position: relative;
            right: 16px;
            top: 16px;
            overflow: visible;
        }
        
        .image-component{
            height: 100%;
            padding: 10px;
        }

        .image-container {
            width: auto;
            height: auto;
        }
        
        .image-resize {
            display: block;
            max-width:100%;
            width: auto;
            height: auto;
        }
    `]
})
export class ImageComponent extends ComponentTemplate{


    constructor(collabEditorService: CollabEditorService){
        super(collabEditorService);
    }


}
