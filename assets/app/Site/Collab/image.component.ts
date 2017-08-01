import {Component, ElementRef, ViewChild} from "@angular/core";
import {ComponentTemplate} from "./component.template";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'app-image',
    template: `
        <div (mouseenter)="widgets.OnMouseEnter($event)" 
             (mouseleave)="widgets.OnMouseLeave($event)">
            <div #content fxFlex fxLayout="column" fxLayoutGap="10px" class="image-component">
                <h4 *ngIf="data.title != undefined">{{data.title}}</h4>
                <img src="{{data.url}}" class="image-resize"/>
                <p *ngIf="data.caption != undefined">{{data.caption}}</p>
            </div>
        </div>
        <collab-widgets #widgets
                        (OnMoveUp)="OnMoveUp()"
                        (OnMoveDown)="OnMoveDown()"
                        (OnDelete)="OnDelete()"
                        (OnEdit)="OnEditMe()"
                        class="floating-widgets"
                        [style.bottom]="getContentHeight()"></collab-widgets>
    `,
    styles: [`
        .floating-widgets {
            height: 0;
            position: relative;
            right: 16px;
            overflow: visible;
        }
        
        .image-component{
            height: 100%;
            padding: 10px;
        }

        .image-resize {
            display: block;
            width:100%;
            height: auto;
        }
    `]
})
export class ImageComponent extends ComponentTemplate{


    constructor(collabEditorService: CollabEditorService){
        super(collabEditorService);
    }


}

export class ImageModel {
    constructor(public img_id: string,
                public url: string,
                public title?: string,
                public caption?:string) {}
}