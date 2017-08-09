import {Component, ViewRef} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {ComponentTemplate} from "./component.template";
import {IMediaModel} from "../../CMS/media/imedia.model";


@Component({
    moduleId: module.id.toString(),
    selector: 'app-video',
    template: `
        <collab-widgets #widgets
                        (OnMoveUp)="OnMoveUp()"
                        (OnMoveDown)="OnMoveDown()"
                        (OnDelete)="OnDelete()"
                        (OnEdit)="OnEditMe()"
                        class="floating-widgets" *ngIf="isEditMode"></collab-widgets>
        <div (mouseenter)="widgets?.OnMouseEnter($event)" 
             (mouseleave)="widgets?.OnMouseLeave($event)" fxLayout="row" fxFlexAlign="center center">
            <div fxFlex="1 0 auto" #content>
                <div class="container">
                    <iframe [src]="safeResourceURL"
                            frameborder="0"
                            allowfullscreen class="video"></iframe>    
                </div>
                
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

        .container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
        }
        .video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        :host {
            display: block;
            width: 100%;
        }

    `]
})
export class VideoComponent extends ComponentTemplate{

    constructor(collabEditorService: CollabEditorService, private sanitizer: DomSanitizer){
        super(collabEditorService);
    }

    safeResourceURL: SafeResourceUrl;
    videoWidth: number;
    videoHeight: number;

    initialise( data: IMediaModel, viewRef: ViewRef ){
        super.initialise(data,viewRef);
        this.safeResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        this.videoWidth = data.width;
        this.videoHeight = data.height;
    }
}

