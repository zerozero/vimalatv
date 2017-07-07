import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {CmsComponent} from "./cms.component";
import {HomeComponent} from "./home/home.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {ContactComponent} from "./contact/contact.component";
import {CmsCollabComponent} from "./collab/collab.component";
import {MediaComponent} from "./media/media.component";
import {CmsBioComponent} from "./bio/bio.component";
import {GigsComponent} from "./gigs/gigs.component";
import {ArtistComponent} from "./artists/artist.component";
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
            { path: 'reviews', component: ReviewsComponent },
            { path: 'contact', component: ContactComponent }
        ]
    }
];

export const CMS_ROUTING  = RouterModule.forChild((CMS_ROUTES));