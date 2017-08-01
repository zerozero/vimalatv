import {Component, EventEmitter, Output} from "@angular/core";
import {isNullOrUndefined} from "util";


@Component({
    moduleId: module.id.toString(),
    selector: 'collab-widgets',
    styles:[`
        
    `],
    template: `
        <div class="widget" *ngIf="isMouseInside" fxFlex="1 0 auto" fxLayout="row" fxLayoutGap="5px" fxLayoutAlign="end start">
            <button class="widget" type="button" (click)="moveUp()" fxFlex="0 0 auto" md-mini-fab><md-icon>arrow_upward</md-icon></button>
            <button class="widget" type="button" (click)="moveDown()" fxFlex="0 0 auto" md-mini-fab><md-icon>arrow_downward</md-icon></button>
            <button class="widget" type="button" (click)="edit()" fxFlex="0 0 auto" md-mini-fab><md-icon>edit</md-icon></button>
            <button class="widget" type="button" (click)="delete()" fxFlex="0 0 auto" md-mini-fab><md-icon>remove_circle_outline</md-icon></button>
        </div>
    `
})
export class CollabWidgetsComponent{

    @Output() OnMoveUp: EventEmitter<any> = new EventEmitter();
    @Output() OnMoveDown: EventEmitter<any> = new EventEmitter();
    @Output() OnDelete: EventEmitter<any> = new EventEmitter();
    @Output() OnEdit: EventEmitter<any> = new EventEmitter();

    constructor(){}

    public isMouseInside: boolean = false;

    moveUp(){
        this.OnMoveUp.emit();
    }
    
    moveDown(){
        this.OnMoveDown.emit();
    }
    
    delete(){
        this.OnDelete.emit();
    }

    edit(){
        this.OnEdit.emit();
    }

    OnMouseEnter(evt){
        this.isMouseInside = true;
    }

    OnMouseLeave(evt: MouseEvent){
        //don't hide when rolling over widgets
        if (isNullOrUndefined(evt)){
            this.isMouseInside = false;
            return;
        }

        if (evt.toElement.classList.contains('widget'))
            return;
        this.isMouseInside = false;
    }

}