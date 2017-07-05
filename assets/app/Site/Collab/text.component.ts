import {Component, Input} from "@angular/core";
import {IComponentTemplate} from "./collab.component";
@Component({
    moduleId: module.id.toString(),
    selector: 'app-text',
    template: `
        <div fxFlex>
            <h1 *ngIf="data.title != undefined">{{data.title}}</h1>
            <p>{{data.content}}</p>
        </div>
    `,
    styles: [
        `
            h1, p {
                color: white;
            }
        `
    ]
})
export class TextComponent implements IComponentTemplate{

    data: TextModel;

    constructor(){}

    initialise( data: TextModel ){
        this.data = data;
    }
}

export class TextModel {
    constructor(public txt_id: string,
                public content: string,
                public title?: string) {}
}