import {Component} from "@angular/core";

import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {ComponentTemplate, IComponentTemplate} from "./component.template";
@Component({
    moduleId: module.id.toString(),
    selector: 'app-text',
    template: `
        <collab-widgets #widgets
                        (OnMoveUp)="OnMoveUp()"
                        (OnMoveDown)="OnMoveDown()"
                        (OnDelete)="OnDelete()"
                        (OnEdit)="OnEditMe()"
                        class="floating-widgets" *ngIf="isEditMode"></collab-widgets>            
        <div fxLayout="row" 
             (mouseenter)="widgets?.OnMouseEnter($event)" 
             (mouseleave)="widgets?.OnMouseLeave($event)">
            <div fxFlex #content>
                <h1 *ngIf="data.title != undefined">{{data.title}}</h1>
                <p>{{data.content}}</p>
            </div>
        </div>
    `,
    styles: [
        `
            h1, p {
                color: white;
            }

            invisible {
                display: none !important;
            }

            .floating-widgets {
                height: 0;
                position: relative;
                right: 16px;
                top: 16px;
                overflow: visible;
            }

        `
    ]
})
export class TextComponent extends ComponentTemplate{



    constructor(collabEditorService: CollabEditorService){
        super(collabEditorService);
    }




}
