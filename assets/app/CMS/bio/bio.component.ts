import {Component} from "@angular/core";
import {CmsDynamicPageComponent} from "../dynamicPage/dynamic.page.component";
import {DynamicPage} from "../dynamicPage/dynamic.page.model";
import {Artist} from "../artists/artist.model";
import {DynamicPageService} from "../dynamicPage/dynamic.page.service";
import {ICategory} from "../dynamicPage/category";
@Component({
    selector: 'cms-bio',
    templateUrl: '../dynamicPage/dynamic.page.component.html',
    styleUrls: ['../dynamicPage/dynamic.page.component.css']
})
export class CmsBioComponent extends CmsDynamicPageComponent{




    ngOnInit(): void {
        console.log("I am BIO");
        this.endpoint = DynamicPageService.BIO_ENDPOINT;
        this._getPages();
        let cat:ICategory = {
            title:'Biography',
            id:''
        };
        this.categories = [cat];
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

    getPreview( id: string ):string{
        return this.categories[0].title;
    }

}