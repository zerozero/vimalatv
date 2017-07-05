import {Component} from "@angular/core";

@Component({
    selector: 'cms-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent{

    public navLinks = [
        {
            label:"Home",
            route:"home",
        },
        {
            label:"Bio",
            route:"bio",
        },
        {
            label:"Gigs",
            route:"gigs",
        },
        {
            label:"Media",
            route:"media",
        },
        {
            label:"Artist",
            route:"artist",
        },
        {
            label:"Collaborations",
            route:"collab",
        },
        {
            label:"Reviews",
            route:"reviews",
        },
        {
            label:"Contact",
            route:"contact",
        },
    ];
}