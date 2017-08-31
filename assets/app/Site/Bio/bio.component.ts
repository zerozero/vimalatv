import {Component, OnDestroy, OnInit} from "@angular/core";
import {DynamicPageService} from "../../CMS/dynamicPage/dynamic.page.service";
import {DynamicPageComponent} from "../DynamicPage/dynamic.page.component";

@Component({
    selector: 'app-bio',
    templateUrl: '../DynamicPage/dynamic.page.component.html',
    styleUrls: ['../DynamicPage/dynamic.page.component.css']
})
export class BioComponent extends DynamicPageComponent implements OnInit, OnDestroy{

    ngOnInit(): void {
        this.endpoint = DynamicPageService.BIO_ENDPOINT;
        this._getPagesOfType(this.endpoint,true);
        super.ngOnInit();

    }

    ngOnDestroy(): void {

    }
}