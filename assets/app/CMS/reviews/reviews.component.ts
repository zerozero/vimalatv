import {Component} from "@angular/core";
import {CmsDynamicPageComponent} from "../dynamicPage/dynamic.page.component";
import {DynamicPageService} from "../dynamicPage/dynamic.page.service";
import {ICategory} from "../dynamicPage/category";
@Component({
    selector: 'cms-reviews',
    templateUrl: '../dynamicPage/dynamic.page.component.html',
    styleUrls: ['../dynamicPage/dynamic.page.component.css']
})
export class CmsReviewsComponent extends CmsDynamicPageComponent{




    ngOnInit(): void {

        this.endpoint = DynamicPageService.REVIEWS_ENDPOINT;
        this._getPages();
        let cat:ICategory = {
            title:'Reviews',
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