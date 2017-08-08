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
             (mouseleave)="widgets?.OnMouseLeave($event)">
            <div fxFlex class="video-component" #content>
                <iframe [width]="videoWidth" 
                        [height]="videoHeight" 
                        [src]="safeResourceURL" 
                        frameborder="0" 
                        allowfullscreen></iframe>
            </div>
        </div>
    `,
    styles: [`
        .video-component{
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

