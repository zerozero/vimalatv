import {Component} from "@angular/core";

import {DynamicPageEditorService} from "../../CMS/dynamicPage/page.editor.service";
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
                <h1 *ngIf="data.title != undefined" [class.heading]="isHeading">{{data.title}}</h1>
                <p>{{data.content}}</p>
            </div>
        </div>
    `,
    styles: [
        `
            h1, p {
                color: white;
                padding-right: 10px;
            }
            
            @media screen  and (max-width: 599px){
                .heading{
                    font-size: 40px;
                }
            }

            @media screen  and (min-width: 600px){
                .heading{
                    font-size: 64px;
                }
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

            :host {
                display: block;
                width: 100%;
            }

        `
    ]
})
export class TextComponent extends ComponentTemplate{

    public isHeading: boolean = true;

    constructor(collabEditorService: DynamicPageEditorService){
        super(collabEditorService);
    }




}
