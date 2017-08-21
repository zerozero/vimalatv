import {Component} from "@angular/core";
import {CmsDynamicPageComponent} from "../collab/dynamic.page.component";
import {DynamicPage} from "../collab/dynamic.page.model";
import {Artist} from "../artists/artist.model";
@Component({
    selector: 'cms-bio',
    templateUrl: '../collab/dynamic.page.component.html',
    styleUrls: ['../collab/dynamic.page.component.css']
})
export class CmsBioComponent extends CmsDynamicPageComponent{


    ngOnInit(): void {

        this._getBioPages();
        this.artists = [new Artist(null,'Biography', true)];
        this.sub = this.activatedRoute.data.subscribe(data => {
            console.log(data.type);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }


    protected _getBioPages():void {
        this.pageService
            .getPages('__page/bio/:id',false)
            .subscribe((pages) => {
                this.pages = pages;
            });
    }


    /*

     */
    save( collab: DynamicPage ){
        this.pageService
            .addPage('__page/bio/:id', collab)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    console.error(err);
                }
            );
    }

}