import {Component} from "@angular/core";
import {IComponentTemplate} from "./collab.component";

@Component({
    moduleId: module.id.toString(),
    selector: 'app-image',
    template: `
        <div fxFlex fxLayout="column" fxLayoutGap="10px" class="image-component">
            <h4 *ngIf="data.title != undefined">{{data.title}}</h4>
            <img src="{{data.url}}" class="image-resize"/>
            <p *ngIf="data.caption != undefined">{{data.caption}}</p>
        </div>
    `,
    styles: [`
        .image-component{
            height: 100%;
            padding: 10px;
        }

        .image-resize {
            display: block;
            max-width:100%;
            max-height:100%;
            width: auto;
            height: auto;
        }
    `]
})
export class ImageComponent implements IComponentTemplate{

    data : ImageModel;

    constructor(){}

    public initialise( data : ImageModel ){
        this.data = data;


    }
}

export class ImageModel {
    constructor(public img_id: string,
                public url: string,
                public title?: string,
                public caption?:string) {}
}