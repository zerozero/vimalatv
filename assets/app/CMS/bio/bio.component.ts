import {Component} from "@angular/core";
import {CmsDynamicPageComponent} from "../dynamicPage/dynamic.page.component";
import {DynamicPage} from "../dynamicPage/dynamic.page.model";
import {Artist} from "../artists/artist.model";
import {DynamicPageService} from "../dynamicPage/dynamic.page.service";
@Component({
    selector: 'cms-bio',
    templateUrl: '../dynamicPage/dynamic.page.component.html',
    styleUrls: ['../dynamicPage/dynamic.page.component.css']
})
export class CmsBioComponent extends CmsDynamicPageComponent{




    ngOnInit(): void {

        this.endpoint = DynamicPageService.BIO_ENDPOINT;
        this._getPages();
        this.artists = [new Artist(null,'Biography', true)];
        this.sub = this.activatedRoute.data.subscribe(data => {
            console.log(data.type);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }


    protected _getPages():void {
        this._getPagesOfType(this.endpoint,false);
    }


}