import {Component, OnInit} from "@angular/core";
import {Gig} from "../../CMS/gigs/gig.model";
import {GigService} from "../../CMS/gigs/gig.service";
import {routerTransition} from "../../router.animations";

@Component({
    selector: 'app-gigs',
    templateUrl: './gigs.component.html',
    styleUrls: ['./gigs.component.css'],
    // animations: [routerTransition()],
    // host: {'[@routerTransition]': ''}
})
export class GigsComponent implements OnInit{

    gigs: Gig[] = [];
    filteredGigs: Gig[];

    constructor(
        private gigService:GigService) {}

    ngOnInit(): void {
        this._getAll();
    }

    private _getAll():void {
        this.gigService
            .getAllEnabled()
            .subscribe((gigs) => {
                this.gigs = gigs;
                this.filterGigs();
            });
    }

    filterGigs(){

        let now = new Date();
        let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0).getTime();
        this.filteredGigs = this.gigs.filter((gig) => {
            let gigTime = gig.date.getTime();
            return (gigTime >= midnight)
        });

        this.filteredGigs.sort( (gig1: Gig, gig2: Gig ):number => {
            if ( gig1.date.getTime() > gig2.date.getTime() ) return -1;
            if ( gig1.date.getTime() < gig2.date.getTime() ) return 1;
            return 0;
        });
    }





}