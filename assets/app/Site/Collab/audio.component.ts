import {Component} from "@angular/core";
import {IComponentTemplate} from "./collab.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
@Component({
    moduleId: module.id.toString(),
    selector: 'app-audio',
    template: `
        <div fxFlex class="audio-component">
            <iframe width="100%" height="166" scrolling="no" frameborder="no" [src]="safeResourceURL"></iframe>
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
    `]
})
export class AudioComponent implements IComponentTemplate{

    data : AudioModel;
    // soundcloudURL: string = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/63497134&amp;color=ff4081&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false';
    safeResourceURL: SafeResourceUrl;

        // <iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/63497134&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
    constructor(private sanitizer: DomSanitizer){

    }

    initialise( data: AudioModel ){
        this.data = data;
        this.safeResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }
}

export class AudioModel {
    constructor(public aud_id: string,
                public url: string,
                public title?: string,
                public caption?:string) {}
}