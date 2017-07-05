import {Component, Inject, OnInit} from "@angular/core";
import {Artist} from "./artist.model";
import {DateAdapter, MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {ArtistService} from "./artist.service";
@Component({
    selector: 'cms-artist',
    styleUrls: ['./artist.component.css'],
    templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit{


    artists: Artist[] = [];

    constructor(
        private artistService: ArtistService,
        public dialog: MdDialog) {}

    ngOnInit(): void {
        this._getAll();
    }

    private _getAll():void {
        this.artistService
            .getAll()
            .subscribe((artists) => {
                this.artists = artists;
            });
    }

    /*

     */
    createArtist(){
        let artist = new Artist(null,  "", false);
        let dialogRef = this.dialog.open(EditArtistDialog, {data:artist, disableClose: true, width: '400px', height: '200px'});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.save(result);
        });
    }

    /*

     */
    editItem(artist:Artist){

        let dialogRef = this.dialog.open(EditArtistDialog, {data:artist, disableClose: true, width: '400px', height: '200px'});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.update(result);
        });
    }

    /*

     */
    deleteItem(artist: Artist){
        let dialogRef = this.dialog.open(DeleteArtistDialog, {data:artist, disableClose: true,});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.delete(result);
        });
    }

    /*

     */
    changeEnabled(artist:Artist, enabled: boolean){

        artist.enabled = enabled;
        this.update(artist);
    }

    /*

     */
    save( artist: Artist ){
        this.artistService
            .add(artist)
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
    update( artist: Artist){
        this.artistService
            .update(artist)
            .subscribe(
                (data) => {
                    // this.filterArtists();
                },
                (err) => {
                    console.error(err);
                }
            )
    }

    /*

     */
    delete(artist:Artist){
        this.artistService
            .delete(artist)
            .subscribe(
                (data) => {
                    // this.filterArtists();
                },
                (err) => {
                    console.error(err);
                }
            )
    }
}

/*

 EDIT ARTIST DIALOG

 */
@Component({
    selector: 'edit-artist-dialog',
    templateUrl: './edit.artist.modal.component.html',
    styles: [
            `
            .artist-container{
                width: 420px;
            }

            .full-width {
                width: 100%;
            }
        `
    ]
})
export class EditArtistDialog {

    startDate = new Date(1990, 0, 1);
    private clonedArtist: Artist;

    constructor(public dialogRef: MdDialogRef<EditArtistDialog>,
                @Inject(MD_DIALOG_DATA) public data: Artist) {
        this.clonedArtist = data.clone();
    }


    onCancel(){
        this.data.reset(this.clonedArtist);
        this.dialogRef.close();
    }

    onSubmit(){
        this.dialogRef.close(this.data);
    }
}

/*

 DELETE ARTIST DIALOG

 */


@Component({
    selector: 'delete-artist-dialog',
    templateUrl: './confirm.delete.artist.component.html',
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
export class DeleteArtistDialog {
    constructor(public dialogRef: MdDialogRef<DeleteArtistDialog>,
                @Inject(MD_DIALOG_DATA) public data: Artist) {}

    onDecline(){
        this.dialogRef.close();
    }

    onAccept(){
        this.dialogRef.close(this.data);
    }
}
