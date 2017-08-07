import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./pagenotfound.component";

const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

export const APP_ROUTING  = RouterModule.forRoot((APP_ROUTES),{ enableTracing: false });