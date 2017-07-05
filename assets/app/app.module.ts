import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {SiteModule} from "./Site/site.module";
import {APP_ROUTING} from "./app.routing";
import {SiteComponent} from "./Site/site.component";
import {MdButtonModule, MdMenuModule, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CmsModule} from "./CMS/cms.module";
import {GigService} from "./CMS/gigs/gig.service";
import {HttpModule} from "@angular/http";
import {ArtistService} from "./CMS/artists/artist.service";
import {CollabService} from "./CMS/collab/collab.service";

@NgModule({
    declarations: [
        SiteComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        SiteModule,
        CmsModule,
        MdToolbarModule,
        MdButtonModule,
        MdSidenavModule,
        MdMenuModule,
        FlexLayoutModule,
        APP_ROUTING
    ],
    providers: [
        GigService,
        ArtistService,
        CollabService
    ],
    bootstrap: [AppComponent]
})
export class AppModule{

}