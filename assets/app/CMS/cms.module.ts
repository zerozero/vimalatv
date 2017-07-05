import {NgModule} from "@angular/core";
import {CMS_ROUTING} from "./cms.routing";
import {AuthComponent} from "./auth/auth.component";
import {CmsComponent} from "./cms.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    DateAdapter,
    MD_DATE_FORMATS,
    MdButtonModule, MdCardModule, MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule, MdOptionModule, MdProgressBarModule, MdSelectModule,
    MdSidenavModule, MdSlideToggleModule,
    MdTabsModule,
    MdToolbarModule, NativeDateAdapter
} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {Http, RequestOptions} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {AuthGuard} from "./auth/auth-guard.service";
import {Auth} from "./auth/auth.service";
import {TabsComponent} from "./tabs/tabs.component";
import {HomeComponent} from "./home/home.component";
import {BioComponent} from "./bio/bio.component";
import {MediaComponent} from "./media/media.component";
import {CollabComponent, DeleteCollabDialog, EditCollabDialog} from "./collab/collab.component";
import {EditGigDialog, DeleteGigDialog, GigsComponent} from "./gigs/gigs.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {ContactComponent} from "./contact/contact.component";
import {FormsModule} from "@angular/forms";
import {ArtistComponent, DeleteArtistDialog, EditArtistDialog} from "./artists/artist.component";
import {ImageUploaderComponent} from "./collab/image.uploader.component";
import {FileDropDirective, FileSelectDirective} from "ng2-file-upload";
import {TextEditorComponent} from "./collab/text.editor.component";

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
        BrowserModule,
        FormsModule,
        MdToolbarModule,
        MdButtonModule,
        MdSidenavModule,
        MdMenuModule,
        MdTabsModule,
        MdListModule,
        MdIconModule,
        FlexLayoutModule,
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
        BioComponent,
        MediaComponent,
        CollabComponent,
        ArtistComponent,
        GigsComponent,
        ReviewsComponent,
        ContactComponent,
        ImageUploaderComponent,
        TextEditorComponent,
        FileDropDirective,
        FileSelectDirective,
        DeleteGigDialog,
        EditGigDialog,
        EditArtistDialog,
        DeleteArtistDialog,
        EditCollabDialog,
        DeleteCollabDialog
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
        EditCollabDialog,
        DeleteCollabDialog
    ]
})

export class CmsModule {}