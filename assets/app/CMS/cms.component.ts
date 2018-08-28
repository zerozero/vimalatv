
import {Component} from "@angular/core";
import {Router} from "@angular/router";
// import {Auth} from "./auth/auth.service";
import {UniversalAuth} from './auth/universalAuth.service';

@Component({
    selector: 'app-cms',
    templateUrl: './cms.component.html',
    styleUrls: ['./cms.component.css']
})

export class CmsComponent{

    constructor(
        private router: Router, private auth:UniversalAuth){
        // auth.handleAuthentication();
    }

    authenticated(){
            return true;
        // console.log(this.auth.isAuthenticated());
        // return this.auth.isAuthenticated();
    }

    logout(){
        this.auth.logout();
        // this.router.navigateByUrl('/cms');
    }

    login(){
        // this.router.navigateByUrl('/cms');
        this.auth.login();
    }
}