import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./Home/home.component";
import {BioComponent} from "./Bio/bio.component";
import {GigsComponent} from "./Gigs/gigs.component";
import {MediaComponent} from "./Media/media.component";
import {CollabComponent} from "./Collab/collab.component";
import {ReviewsComponent} from "./Reviews/reviews.component";
import {ContactComponent} from "./Contact/contact.component";
import {SiteComponent} from "./site.component";

const SITE_ROUTES: Routes = [
    {
        path:'', component: SiteComponent
        , children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent},
        { path: 'bio', component: BioComponent },
        { path: 'gigs', component: GigsComponent },
        { path: 'media/:type', component: MediaComponent },
        { path: 'collab/:artist_id', component: CollabComponent },
        { path: 'reviews', component: ReviewsComponent },
        { path: 'contact', component: ContactComponent }
    ]
    }
];

export const SITE_ROUTING  = RouterModule.forChild((SITE_ROUTES));