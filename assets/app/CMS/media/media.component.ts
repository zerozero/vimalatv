import {Component, Inject, OnInit} from "@angular/core";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import { MediaModel} from "./media.model";
import {MediaService} from "./media.service";
import {IMediaModel} from "./imedia.model";

@Component({
    selector: 'cms-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit{

    mediaSources: IMediaModel[] = [];

    constructor(public dialog: MdDialog,
                private mediaService: MediaService){

    }

    ngOnInit(){
        this._getAll();
    }

    private _getAll():void {
        this.mediaService
            .getAll()
            .subscribe((sources) => {
                this.mediaSources = sources;
            });
    }

    changeEnabled(source:any, enabled: boolean){
        source.enabled = enabled;
        this.update(source);
    }

    moveDown( source:IMediaModel ){
        console.log("move down "+source.title);
    }

    moveUp( source:IMediaModel ){
        console.log("move up "+source.title+" "+this.mediaSources.indexOf(source));
    }

    createItem(){
        let source: IMediaModel = {
            media_id: null,
            type : "",
            url: "",
            title: "",
            enabled: false
        };
        let dialogRef = this.dialog.open(EditMediaDialog, {data:source, disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.save(result);
        });
    }

    editItem(source:IMediaModel){
        let dialogRef = this.dialog.open(EditMediaDialog, {data:source, disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.update(result);
        });
    }

    deleteItem(media:IMediaModel){
        let dialogRef = this.dialog.open(DeleteMediaDialog, {data:media, disableClose: true,});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.delete(result);
        });
    }

    /*

     */
    save( source:IMediaModel ){
        this.mediaService
            .add(source)
            .subscribe(
                (data) => {
                    // this.mediaSources = data;
                    console.log(data);
                    console.log(data == this.mediaSources);
                },
                (err) => {
                    console.error(err);
                }
            );
    }

    /*

     */
    update( source:IMediaModel){
        this.mediaService
            .update(source)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    console.error(err);
                }
            )
    }

    /*

     */
    delete(source:IMediaModel){
        this.mediaService
            .delete(source)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    console.error(err);
                }
            )
    }
}

/*

 EDIT GIG DIALOG
*/

@Component({
    selector: 'edit-media-dialog',
    templateUrl: './edit.media.modal.component.html',
    styles: [
            `
            .gig-container{
                width: 420px;
            }

            .full-width {
                width: 100%;
            }
        `
    ]
})
export class EditMediaDialog {

    private clonedMedia: IMediaModel;

    public typeAudio: string = MediaModel.AUDIO;
    public typeVideo: string = MediaModel.VIDEO;

    constructor(public dialogRef: MdDialogRef<EditMediaDialog>,
                @Inject(MD_DIALOG_DATA) public data: IMediaModel) {

        this.clonedMedia = MediaModel.clone(data);
    }


    onCancel(){
        this.data = MediaModel.clone(this.clonedMedia);
        this.dialogRef.close();
    }

    onSubmit(){
        this.dialogRef.close(this.data);
    }
}

/*

 DELETE GIG DIALOG
*/



@Component({
    selector: 'delete-media-dialog',
    templateUrl: './confirm.delete.media.component.html',
    styles: [
            `
            .delete{
                font-size: 72px;
            }

            button{
                margin:12px;
            }
        `
    ]
})
export class DeleteMediaDialog {
    constructor(public dialogRef: MdDialogRef<DeleteMediaDialog>,
                @Inject(MD_DIALOG_DATA) public data: any) {}

    onDecline(){
        this.dialogRef.close();
    }

    onAccept(){
        this.dialogRef.close(this.data);
    }
}
