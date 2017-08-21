import {NgModule} from "@angular/core";
import {CMS_ROUTING} from "./cms.routing";
import {AuthComponent} from "./auth/auth.component";
import {CmsComponent} from "./cms.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    DateAdapter,
    MD_DATE_FORMATS,
    MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdInputModule,
    MdListModule,
    MdNativeDateModule,
    MdOptionModule,
    MdProgressBarModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdTabsModule,
} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {Http, RequestOptions} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {AuthGuard} from "./auth/auth-guard.service";
import {Auth} from "./auth/auth.service";
import {TabsComponent} from "./tabs/tabs.component";
import {DeleteQuoteDialog, EditQuoteDialog, HomeComponent} from "./home/home.component";
import {CmsBioComponent} from "./bio/bio.component";
import {DeleteMediaDialog, EditMediaDialog, MediaComponent} from "./media/media.component";
import {CmsDynamicPageComponent, DeletePageDialog, EditPageDialog} from "./collab/dynamic.page.component";
import {EditGigDialog, DeleteGigDialog, GigsComponent} from "./gigs/gigs.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {ContactComponent} from "./contact/contact.component";
import {FormsModule} from "@angular/forms";
import {ArtistComponent, DeleteArtistDialog, EditArtistDialog} from "./artists/artist.component";
import {ImageUploaderComponent} from "./collab/image.uploader.component";
import {FileUploadModule} from "ng2-file-upload";
import {TextEditorComponent} from "./collab/text.editor.component";
import {EmbedVideoComponent} from "./collab/embed.video.component";
import {EmbedAudioomponent} from "./collab/embed.audio.component";
import {MyCommonModule} from "../common.module";
import {MediaFilterPipe} from "./media/media.filter";
import {CommonModule} from "@angular/common";
import {TruncateFilterPipe} from "./media/truncate.filter";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

const MY_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
// dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
};

@NgModule({
    imports: [
        MyCommonModule,
        FormsModule,
        FileUploadModule,
        MdTabsModule,
        MdListModule,
        MdDialogModule,
        MdInputModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdCheckboxModule,
        MdSlideToggleModule,
        MdOptionModule,
        MdSelectModule,
        MdProgressBarModule,
        CMS_ROUTING
    ],
    declarations: [
        CmsComponent,
        AuthComponent,
        TabsComponent,
        HomeComponent,
        CmsBioComponent,
        MediaComponent,
        CmsDynamicPageComponent,
        ArtistComponent,
        GigsComponent,
        ReviewsComponent,
        ContactComponent,
        ImageUploaderComponent,
        TextEditorComponent,
        EmbedVideoComponent,
        EmbedAudioomponent,
        DeleteGigDialog,
        EditGigDialog,
        EditArtistDialog,
        DeleteArtistDialog,
        EditPageDialog,
        DeletePageDialog,
        EditMediaDialog,
        DeleteMediaDialog,
        MediaFilterPipe,
        TruncateFilterPipe,
        EditQuoteDialog,
        DeleteQuoteDialog
    ],
    providers: [
        Auth,
        AuthGuard,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        }
    ],
    entryComponents: [
        DeleteGigDialog,
        EditGigDialog,
        EditArtistDialog,
        DeleteArtistDialog,
        EditPageDialog,
        DeletePageDialog,
        EditMediaDialog,
        DeleteMediaDialog,
        EditQuoteDialog,
        DeleteQuoteDialog
    ]
})

export class CmsModule {}