import {RouterModule, Routes} from "@angular/router";

const APP_ROUTES : Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]

export const APP_ROUTING  = RouterModule.forRoot((APP_ROUTES));