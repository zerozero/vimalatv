import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {IMediaModel} from "../../CMS/media/imedia.model";

@Component({
    selector: 'video-thumb',
    template: `
        <div>
            <img src="{{thumbnailImageUrl}}" (click)="PlayVideo()" class="image-button"/>
        </div>
    `,
    styles: [`
        .image-button{
            cursor: pointer;
        }

        .image-button:hover{
            opacity: 0.5;
        }
    `]
})
export class VideoThumbnail implements OnInit{

    @Input() public mediaModel: IMediaModel;
    @Output() OnPlayVideo: EventEmitter<IMediaModel> = new EventEmitter();

    public thumbnailImageUrl: string;

    ngOnInit(){
        let arr = this.mediaModel.url.split('/');
        let id = arr[arr.length-1];
        this.thumbnailImageUrl = 'https://img.youtube.com/vi/'+id+'/2.jpg';
    }

    PlayVideo(){
        this.OnPlayVideo.emit(this.mediaModel);
    }

}
