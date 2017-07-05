
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Auth} from "./auth/auth.service";

@Component({
    selector: 'app-cms',
    templateUrl: './cms.component.html',
    styleUrls: ['./cms.component.css']
})

export class CmsComponent{

    constructor(
        private router: Router, private auth:Auth){}

    authenticated(){
        return this.auth.authenticated();
    }

    logout(){
        this.auth.logout();
        this.router.navigateByUrl('/cms');
    }

    login(){
        this.auth.login();
    }
}