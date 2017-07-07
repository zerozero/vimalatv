import {NgModule} from "@angular/core";
import {ReviewsComponent} from "./Reviews/reviews.component";
import {MediaComponent} from "./Media/media.component";
import {GigsComponent} from "./Gigs/gigs.component";
import {ContactComponent} from "./Contact/contact.component";
import {HomeComponent} from "./Home/home.component";
import {AppComponent} from "../app.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdIconModule, MdListModule, MdToolbarModule} from "@angular/material";
import {SITE_ROUTING} from "./site.routing";
import {BrowserModule} from "@angular/platform-browser";
import {ImageComponent} from "./Collab/image.component";
import {AudioComponent} from "./Collab/audio.component";
import {VideoComponent} from "./Collab/video.component";
import {TextComponent} from "./Collab/text.component";
import {CollabComponent} from "./Collab/collab.component";
import {CommonModule} from "../common.module";
import {BioComponent} from "./Bio/bio.component";


//refactor
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        MdToolbarModule,
        MdButtonModule,
        MdIconModule,
        MdListModule,
        FlexLayoutModule,
        SITE_ROUTING
    ],
    declarations: [
        AppComponent,
        BioComponent,
        HomeComponent,
        ContactComponent,
        GigsComponent,
        MediaComponent,
        ReviewsComponent,
        ImageComponent,
        TextComponent,
        VideoComponent,
        AudioComponent
    ],
    providers: [],
    entryComponents: [
        ImageComponent,
        AudioComponent,
        VideoComponent,
        TextComponent
    ]
})

export class SiteModule {}