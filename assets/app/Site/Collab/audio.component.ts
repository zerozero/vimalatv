import {Component, ViewRef} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ComponentTemplate} from "./component.template";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {IMediaModel} from "../../CMS/media/imedia.model";

@Component({
    moduleId: module.id.toString(),
    selector: 'app-audio',
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
            <div fxFlex class="audio-component" #content>
                <iframe width="100%" height="166" scrolling="no" frameborder="no" [src]="safeResourceURL"></iframe>
            </div>
        </div>
    `,
    styles: [`
        .audio-component{
            margin: 10px;
            padding: 10px;
            max-width: 640px;
            max-height: 480px;
            width: auto;
            height: auto;
            color: white;
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

    `]
})
export class AudioComponent extends ComponentTemplate{

    safeResourceURL: SafeResourceUrl;

    constructor(collabEditorService: CollabEditorService, private sanitizer: DomSanitizer){
        super(collabEditorService);
    }

    initialise( data: IMediaModel, viewRef: ViewRef ){
        super.initialise(data,viewRef);
        this.safeResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }
}
