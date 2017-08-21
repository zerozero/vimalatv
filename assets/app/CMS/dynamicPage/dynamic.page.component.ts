import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {DynamicPageService} from "./dynamic.page.service";
import {DynamicPage} from "./dynamic.page.model";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef, MdTabGroup} from "@angular/material";
import {ArtistService} from "../artists/artist.service";
import {Artist} from "../artists/artist.model";
import {DynamicPageEditorService} from "./page.editor.service";
import {CollabComponent} from "../../Site/Collab/collab.component";
import {IMediaModel} from "../media/imedia.model";
import {MediaModel} from "../media/media.model";
import {TextEditorComponent} from "./text.editor.component";
import {ImageUploaderComponent} from "./image.uploader.component";
import {EmbedVideoComponent} from "./embed.video.component";
import {EmbedAudioomponent} from "./embed.audio.component";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'cms-page',
    templateUrl: './dynamic.page.component.html',
    styleUrls: ['./dynamic.page.component.css']
})
export class CmsDynamicPageComponent implements OnInit, OnDestroy{

    pages: DynamicPage[] = [];
    artists: Artist[] = [];



    selectedValue: string;
    protected sub: any;
    protected endpoint:string;

    constructor(
        protected pageService:DynamicPageService,
        protected artistService:ArtistService,
        protected el: ElementRef,
        public dialog: MdDialog,
        protected activatedRoute: ActivatedRoute){

    }



    ngOnInit(): void {

        this._getAllPages();

        this.sub = this.activatedRoute.data.subscribe(data => {
            console.log(data.type);
        });

    }

    ngOnDestroy(){
         this.sub.unsubscribe();
    }

    protected _getPagesOfType(type:string,filterEnabled:boolean){
        this.pageService
            .getPages(type,filterEnabled)
            .subscribe((pages) => {
                this.pages = pages;
            });
    }

    protected _getAllPages():void {
        this.pageService
            .getAll(false)
            .subscribe((pages) => {
                this.pages = pages;
            });
    }

    /*

     */
    protected _addPageOfType(endpoint:string, page: DynamicPage ){
        this.pageService
            .addPage(endpoint, page)
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
    protected _updatePageOfType( endpoint:string, page: DynamicPage){
        this.pageService
            .updatePage(endpoint,page)
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
    protected _deletePageOfType( endpoint:string, page:DynamicPage){
        this.pageService
            .deletePage(endpoint, page)
            .subscribe(
                (data) => {
                    // this.filterCollabs();
                },
                (err) => {
                    console.error(err);
                }
            )
    }





    /*

     */
    createPage(){
        let page = new DynamicPage(null,  "",[],false);
        let wd = this.el.nativeElement.clientWidth * 0.9;
        let ht = this.el.nativeElement.clientHeight* 0.9;
        let dialogRef = this.dialog.open(EditPageDialog, {data:{page:page,artists:this.artists}, disableClose: true, width:wd.toString() + 'px', height:ht.toString() + 'px'});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.save(result);
        });
    }

    /*

     */
    editItem(page:DynamicPage){

        let wd = this.el.nativeElement.clientWidth * 0.9;
        let ht = this.el.nativeElement.clientHeight* 0.9;
        let dialogRef = this.dialog.open(EditPageDialog, {data:{page:page,artists:this.artists}, disableClose: true, width:wd.toString() + 'px', height:ht.toString() + 'px'});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.update(result);
        });
    }

    /*

     */
    deleteItem(page: DynamicPage){
        let dialogRef = this.dialog.open(DeletePageDialog, {data:page, disableClose: true,});
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.delete(result);
        });
    }

    /*

     */
    changeEnabled(page:DynamicPage, enabled: boolean){

        page.enabled = enabled;
        this.update(page);
    }


    /*

     */
    save( dynamicPage: DynamicPage ){
        this._addPageOfType(this.endpoint,dynamicPage);
    }

    update( dynamicPage: DynamicPage ){
        this._updatePageOfType(this.endpoint,dynamicPage);
    }

    delete( dynamicPage: DynamicPage ){
        this._deletePageOfType(this.endpoint,dynamicPage);
    }

    /*

     */
    // save( page: DynamicPage ){
    //     this.pageService
    //         .add(page)
    //         .subscribe(
    //             (data) => {
    //                 console.log(data);
    //             },
    //             (err) => {
    //                 console.error(err);
    //             }
    //         );
    // }

    /*

     */
    // update( page: DynamicPage){
    //     this.pageService
    //         .update(page)
    //         .subscribe(
    //             (data) => {
    //                 console.log(data);
    //                 // this.filterCollabs();
    //             },
    //             (err) => {
    //                 console.error(err);
    //             }
    //         )
    // }

    /*

     */
    // delete(page:DynamicPage){
    //     this.pageService
    //         .delete(page)
    //         .subscribe(
    //             (data) => {
    //                 // this.filterCollabs();
    //             },
    //             (err) => {
    //                 console.error(err);
    //             }
    //         )
    // }
}



/*

 EDIT COLLAB DIALOG

 */
@Component({
    selector: 'edit-page-dialog',
    templateUrl: './edit.page.modal.component.html',
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

            .invisible {
                display: none !important;
            }
        `
    ],
    providers: [DynamicPageEditorService]
})
export class EditPageDialog {

    public clonedPage: DynamicPage;
    public selectedArtist: Artist;
    public isArtistRequired = false;

    @ViewChild('preview') collabComponent: CollabComponent;
    @ViewChild('mediaTabs') mediaTabs:MdTabGroup;
    @ViewChild('textEditor') textEditor:TextEditorComponent;
    @ViewChild('imageEditor') imageEditor:ImageUploaderComponent;
    @ViewChild('videoEditor') videoEditor:EmbedVideoComponent;
    @ViewChild('audioEditor') audioEditor:EmbedAudioomponent;

    constructor(public dialogRef: MdDialogRef<EditPageDialog>,
                @Inject(MD_DIALOG_DATA)
                public data: any,
                private pageEditorService: DynamicPageEditorService) {

        this.clonedPage = data.page.clone();
        this.isArtistRequired = data.artists.length > 0;
        if (!this.isArtistRequired)
            return;
        this.selectedArtist = data.artists.find((artist) => {
            return artist.artist_id == data.page.artist_id;
        });

    }

    onCancel(){
        this.data.page.reset(this.clonedPage);
        this.dialogRef.close();
    }

    onSubmit(){
        let mydata = this.pageEditorService.getPageData();
        if (this.isArtistRequired)
            this.data.page.artist_id = this.selectedArtist.artist_id;
        this.data.page.templates = mydata;
        this.dialogRef.close(this.data.page);
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
    selector: 'delete-page-dialog',
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
export class DeletePageDialog {
    constructor(public dialogRef: MdDialogRef<DeletePageDialog>,
                @Inject(MD_DIALOG_DATA) public data: DynamicPage) {}

    onDecline(){
        this.dialogRef.close();
    }

    onAccept(){
        this.dialogRef.close(this.data);
    }
}
