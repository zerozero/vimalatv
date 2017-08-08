import {NgModule} from "@angular/core";
import {CollabComponent} from "./Site/Collab/collab.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdSidenavModule,
    MdToolbarModule
} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        CollabComponent
    ],
    imports: [
        MdToolbarModule,
        MdButtonModule,
        MdSidenavModule,
        MdIconModule,
        MdMenuModule,
        MdListModule,
        FlexLayoutModule
    ],
    exports: [
        CollabComponent,
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