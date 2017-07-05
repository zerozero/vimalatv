import {Component} from "@angular/core";
import {IComponentTemplate} from "./collab.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
@Component({
    moduleId: module.id.toString(),
    selector: 'app-video',
    template: `
        <div fxFlex class="video-component">
            <iframe width="560" height="315" [src]="safeResourceURL" frameborder="0" allowfullscreen></iframe>
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
    `]
})
export class VideoComponent implements IComponentTemplate{
    constructor(private sanitizer: DomSanitizer){}

    data: VideoModel;
    safeResourceURL: SafeResourceUrl;

    initialise( data: VideoModel){
        this.data = data;
        this.safeResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
    }
}

export class VideoModel {
    constructor(public vid_id: string,
                public url: string,
                public title?: string,
                public caption?:string) {}
}