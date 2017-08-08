import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {SiteModule} from "./Site/site.module";
import {APP_ROUTING} from "./app.routing";
import {
    MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdSidenavModule,
    MdToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CmsModule} from "./CMS/cms.module";
import {GigService} from "./CMS/gigs/gig.service";
import {HttpModule} from "@angular/http";
import {ArtistService} from "./CMS/artists/artist.service";
import {CollabService} from "./CMS/collab/collab.service";
import {PageNotFoundComponent} from "./pagenotfound.component";
import {MediaService} from "./CMS/media/media.service";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpModule,
        CmsModule,
        SiteModule,
        APP_ROUTING
    ],
    providers: [
        GigService,
        ArtistService,
        CollabService,
        MediaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule{

}