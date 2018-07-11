import {Component, Inject, OnInit} from "@angular/core";
import {DateAdapter, MD_DIALOG_DATA} from '@angular/material';
import {MdDialog, MdDialogRef} from "@angular/material";
import {Gig} from "./gig.model";
import {GigService} from "./gig.service";

@Component({
    selector: 'cms-gigs',
    templateUrl: './gigs.component.html',
    styleUrls: ['./gigs.component.css']
})
export class GigsComponent implements OnInit{

    gigs: Gig[] = [];
    filteredGigs: Gig[];

    historyOff: boolean = true;

    constructor(
        public dialog: MdDialog,
        private dateAdapter: DateAdapter<Date>,
        private gigService:GigService) {}

    ngOnInit(): void {
        this._getAll();
    }

    private _getAll():void {
        this.gigService
            .getAll()
            .subscribe((gigs) => {
                this.gigs = gigs;
                this.filterGigs();
            });
    }

    changeEnabled(gig:Gig, enabled: boolean, permanent: boolean){
        gig.permanent = permanent;
        gig.enabled = enabled;
        this.update(gig);
    }

    changePermanence(gig:Gig, permanent: boolean, enabled: boolean){
        gig.permanent = permanent;
        gig.enabled = enabled;
        this.update(gig);
    }

    filterGigs(){
        if (this.historyOff){
            let now = new Date();
            let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0).getTime();
            this.filteredGigs = this.gigs.filter((gig) => {
                let gigTime = gig.date.getTime();
                return (gigTime >= midnight || gig.permanent)
            });
        }else{
            this.filteredGigs = this.gigs;
        }
        this.filteredGigs.sort( (gig1: Gig, gig2: Gig ):number => {
            if ( gig1.date.getTime() > gig2.date.getTime() ) return -1;
            if ( gig1.date.getTime() < gig2.date.getTime() ) return 1;
            return 0;
        });
    }

    /*

     */
    createItem(){
        let gig = new Gig(null, new Date(), "", "", false, false);
        let dialogRef = this.dialog.open(EditGigDialog, {data:gig, disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.save(result);
        });
    }

    /*

     */
    editItem(gig:Gig){

        let dialogRef = this.dialog.open(EditGigDialog, {data:gig, disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.update(result);
        });
    }

    /*

     */
    deleteItem(gig: Gig){
        let dialogRef = this.dialog.open(DeleteGigDialog, {data:gig, disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.delete(result);
        });
    }

    /*

     */
    isPast( date:Date ):boolean{
        let now = new Date();
        let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0).getTime();
        return date.getTime() < midnight;
    }

    /*

     */
    save( gig: Gig ){
        this.gigService
            .add(gig)
            .subscribe(
                (data) => {
                    this.filterGigs();
                },
                (err) => {
                    console.error(err);
                }
            );
    }

    /*

     */
    update( gig: Gig){
        this.gigService
            .update(gig)
            .subscribe(
                (data) => {
                    this.filterGigs();
                },
                (err) => {
                    console.error(err);
                }
            )
    }

    /*

     */
    delete(gig:Gig){
        this.gigService
            .delete(gig)
            .subscribe(
                (data) => {
                    this.filterGigs();
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
    selector: 'edit-gig-dialog',
    templateUrl: './edit.gig.modal.component.html',
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
export class EditGigDialog {

    startDate = new Date(1990, 0, 1);
    private clonedGig: Gig;

    constructor(public dialogRef: MdDialogRef<EditGigDialog>,
                dateAdapter: DateAdapter<Date>,
                @Inject(MD_DIALOG_DATA) public data: Gig) {
        dateAdapter.setLocale('en');
        this.startDate = data ? data.date : null;
        this.clonedGig = data.clone();
    }

    getVenue(){
        return "Venue From Fn";
    }

    onCancel(){
        this.data.reset(this.clonedGig);
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
    selector: 'delete-gig-dialog',
    templateUrl: './confirm.delete.gig.component.html',
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
export class DeleteGigDialog {
    constructor(public dialogRef: MdDialogRef<DeleteGigDialog>,
                @Inject(MD_DIALOG_DATA) public data: Gig) {}

    onDecline(){
        this.dialogRef.close();
    }

    onAccept(){
        this.dialogRef.close(this.data);
    }
}
