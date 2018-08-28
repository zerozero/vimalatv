import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {CmsComponent} from "./cms.component";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {CmsDynamicPageComponent} from "./dynamicPage/dynamic.page.component";
import {MediaComponent} from "./media/media.component";
import {GigsComponent} from "./gigs/gigs.component";
import {ArtistComponent} from "./artists/artist.component";
import {CmsBioComponent} from "./bio/bio.component";
import {CmsCollabComponent} from "./collab/collab.component";
import {CmsReviewsComponent} from "./reviews/reviews.component";
import {AuthGuard} from './auth/auth-guard.service';
const CMS_ROUTES: Routes = [
    {
        path:'cms', component: CmsComponent
        , children: [
            { path: 'cms', redirectTo: 'cms/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'bio', component: CmsBioComponent },
            { path: 'gigs', component: GigsComponent },
            { path: 'media', component: MediaComponent },
            { path: 'artist', component: ArtistComponent },
            { path: 'collab', component: CmsCollabComponent },
            { path: 'reviews', component: CmsReviewsComponent },
            { path: 'contact', component: ContactComponent }
        ]
    }
];

export const CMS_ROUTING  = RouterModule.forChild((CMS_ROUTES));