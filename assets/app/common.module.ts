import {NgModule} from "@angular/core";
import {CollabComponent} from "./Site/Collab/collab.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdSidenavModule,
    MdToolbarModule
} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {StarRatingComponent} from './star-rating/star-rating.component';


@NgModule({
    declarations: [
        CollabComponent,
        StarRatingComponent
    ],
    imports: [
        BrowserModule,
        MdToolbarModule,
        MdButtonModule,
        MdSidenavModule,
        MdIconModule,
        MdMenuModule,
        MdListModule,
        FlexLayoutModule
    ],
    exports: [
        BrowserModule,
        CollabComponent,
        StarRatingComponent,
        MdToolbarModule,
        MdButtonModule,
        MdSidenavModule,
        MdIconModule,
        MdMenuModule,
        MdListModule,
        FlexLayoutModule
    ],
    entryComponents: []
})

export class MyCommonModule {}