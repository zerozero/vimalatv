import {Component} from "@angular/core";
import {Auth} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'cms-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent{

    constructor(
        private router: Router, private auth:Auth){}

    authenticated(){
            // return true;
        return this.auth.authenticated();
    }
}