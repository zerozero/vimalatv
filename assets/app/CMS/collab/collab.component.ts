import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {CollabService} from "./collab.service";
import {Collab} from "./collab.model";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef, MdTabGroup} from "@angular/material";
import {ArtistService} from "../artists/artist.service";
import {Artist} from "../artists/artist.model";
import {CollabEditorService} from "./collab.editor.service";
import {CollabComponent} from "../../Site/Collab/collab.component";
import {IMediaModel} from "../media/imedia.model";
import {MediaModel} from "../media/media.model";
import {TextEditorComponent} from "./text.editor.component";
import {ImageUploaderComponent} from "./image.uploader.component";
import {EmbedVideoComponent} from "./embed.video.component";
import {EmbedAudioomponent} from "./embed.audio.component";

@Component({
    selector: 'cms-collab',
    templateUrl: './collab.component.html',
    styleUrls: ['./collab.component.css']
})
export class CmsCollabComponent implements OnInit{

    collabs: Collab[] = [];
    artists: Artist[] = [];
    unusedArtists: Artist[] = [];

    selectedValue: string;


    constructor(
        private collabService:CollabService,
        private artistService:ArtistService,
        private el: ElementRef,
        public dialog: MdDialog){

    }

    ngOnInit(): void {
            this._getAllCollabs();
            this._getAllArtists();
            this._getUnusedArtists();
    }

    private getArtistName( id: string ):string{
            let artist: Artist = this.artists.find((artist) => {
                return artist.artist_id == id;
            });
            return artist ? artist.name : "";
    }

    private _getAllCollabs():void {
        this.collabService
            .getAll(false)
            .subscribe((collabs) => {
                this.collabs = collabs;
            });
    }

    private _getAllArtists():void {
        this.artistService
            .getAll()
            .subscribe((artists) => {
                this.artists = artists;
            });
    }

    private _getUnusedArtists():void{
        this.unusedArtists = [];
        this.artists.forEach((artist) => {
            let id = artist.artist_id;
            //todo: search for existing collaborations with this artist id
        });
    }

    /*

     */
    createCollab(){
        let collab = new Collab(null,  "",[],false);
        let wd = this.el.nativeElement.clientWidth * 0.9;
        let ht = this.el.nativeElement.clientHeight* 0.9;
        let dialogRef = this.dialog.open(EditCollabDialog, {data:{collab:collab,artists:this.artists}, disableClose: true, width:wd.toString() + 'px', height:ht.toString() + 'px'});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.save(result);
        });
    }

    /*

     */
    editItem(collab:Collab){

        let wd = this.el.nativeElement.clientWidth * 0.9;
        let ht = this.el.nativeElement.clientHeight* 0.9;
        let dialogRef = this.dialog.open(EditCollabDialog, {data:{collab:collab,artists:this.artists}, disableClose: true, width:wd.toString() + 'px', height:ht.toString() + 'px'});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.update(result);
        });
    }

    /*

     */
    deleteItem(collab: Collab){
        let dialogRef = this.dialog.open(DeleteCollabDialog, {data:collab, disableClose: true,});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.delete(result);
        });
    }

    /*

     */
    changeEnabled(collab:Collab, enabled: boolean){

        collab.enabled = enabled;
        this.update(collab);
    }

    /*

     */
    save( collab: Collab ){
        this.collabService
            .add(collab)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    console.error(err);
                }
            );
    }

    /*

     */
    update( collab: Collab){
        this.collabService
            .update(collab)
            .subscribe(
                (data) => {
                    console.log(data);
                    // this.filterCollabs();
                },
                (err) => {
                    console.error(err);
                }
            )
    }

    /*

     */
    delete(collab:Collab){
        this.collabService
            .delete(collab)
            .subscribe(
                (data) => {
                    // this.filterCollabs();
                },
                (err) => {
                    console.error(err);
                }
            )
    }
}



/*

 EDIT COLLAB DIALOG

 */
@Component({
    selector: 'edit-collab-dialog',
    templateUrl: './edit.collab.modal.component.html',
    styles: [
            `
            .collab-container{
                width: 420px;
            }

            .full-width {
                width: 100%;
            }
            
            .artist-select{
                max-width: 240px;
            }
        `
    ],
    providers: [CollabEditorService]
})
export class EditCollabDialog {

    public clonedCollab: Collab;
    public selectedArtist: Artist;

    @ViewChild('preview') collabComponent: CollabComponent;
    @ViewChild('mediaTabs') mediaTabs:MdTabGroup;
    @ViewChild('textEditor') textEditor:TextEditorComponent;
    @ViewChild('imageEditor') imageEditor:ImageUploaderComponent;
    @ViewChild('videoEditor') videoEditor:EmbedVideoComponent;
    @ViewChild('audioEditor') audioEditor:EmbedAudioomponent;

    constructor(public dialogRef: MdDialogRef<EditCollabDialog>,
                @Inject(MD_DIALOG_DATA)
                public data: any,
                private collabEditorService: CollabEditorService) {

        this.clonedCollab = data.collab.clone();
        this.selectedArtist = data.artists.find((artist) => {
            return artist.artist_id == data.collab.artist_id;
        });

    }

    onCancel(){
        this.data.collab.reset(this.clonedCollab);
        this.dialogRef.close();
    }

    onSubmit(){
        let mydata = this.collabEditorService.getCollabData();
        this.data.collab.artist_id = this.selectedArtist.artist_id;
        this.data.collab.templates = mydata;
        this.dialogRef.close(this.data.collab);
    }

    DoEdit(data:IMediaModel){
        //select tab
        //populate data
        switch( data.type ){
            case MediaModel.AUDIO:
                this.mediaTabs.selectedIndex = 3;
                break;
            case MediaModel.VIDEO:
                this.mediaTabs.selectedIndex = 2;
                break;
            case MediaModel.IMAGE:
                this.mediaTabs.selectedIndex = 1;
                this.imageEditor.editMedia(data);
                break;
            case MediaModel.TEXT:
                this.mediaTabs.selectedIndex = 0;
                this.textEditor.editMedia(data);
                break;
        }
    }
}

/*

 DELETE ARTIST DIALOG

 */


@Component({
    selector: 'delete-collab-dialog',
    templateUrl: './confirm.delete.collab.component.html',
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
export class DeleteCollabDialog {
    constructor(public dialogRef: MdDialogRef<DeleteCollabDialog>,
                @Inject(MD_DIALOG_DATA) public data: Collab) {}

    onDecline(){
        this.dialogRef.close();
    }

    onAccept(){
        this.dialogRef.close(this.data);
    }
}
