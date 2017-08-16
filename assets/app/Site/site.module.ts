import {NgModule} from "@angular/core";
import {ReviewsComponent} from "./Reviews/reviews.component";
import {MediaComponent, ModalVideoPlayer} from "./Media/media.component";
import {GigsComponent} from "./Gigs/gigs.component";
import {ContactComponent} from "./Contact/contact.component";
import {HomeComponent} from "./Home/home.component";
import {AppComponent} from "../app.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SITE_ROUTING} from "./site.routing";
import {BrowserModule} from "@angular/platform-browser";
import {ImageComponent} from "./Collab/image.component";
import {AudioComponent} from "./Collab/audio.component";
import {VideoComponent} from "./Collab/video.component";
import {TextComponent} from "./Collab/text.component";
import {MyCommonModule} from "../common.module";
import {BioComponent} from "./Bio/bio.component";
import {CollabWidgetsComponent} from "./Collab/collab.widgets.component";
import {SiteComponent} from "./site.component";
import {CommonModule} from "@angular/common";
import {VideoThumbnail} from "./Media/video.thumbnail.component";
import {MdGridListModule} from "@angular/material";


//refactor
@NgModule({
    imports: [
        MyCommonModule,
        MdGridListModule,
        SITE_ROUTING
    ],
    declarations: [
        SiteComponent,
        AppComponent,
        BioComponent,
        HomeComponent,
        ContactComponent,
        GigsComponent,
        MediaComponent,
        ReviewsComponent,
        ImageComponent,
        TextComponent,
        CollabWidgetsComponent,
        VideoComponent,
        AudioComponent,
        VideoThumbnail,
        ModalVideoPlayer
    ],
    providers: [],
    entryComponents: [
        ImageComponent,
        AudioComponent,
        VideoComponent,
        TextComponent,
        ModalVideoPlayer
    ]
})

export class SiteModule {}