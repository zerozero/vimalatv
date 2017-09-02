import {Component, OnInit} from "@angular/core";
import {ContactService} from "../../CMS/contact/contact.service";
import {Contact} from "../../CMS/contact/contact.model";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

    contact: Contact = new Contact(null,"","","","");

    constructor(private contactService:ContactService){}

    ngOnInit(): void {
        this._getAll();
    }

    private _getAll():void {
        this.contactService
            .getOne()
            .subscribe((contact) => {
                if (contact)
                    this.contact = contact;
            });
    }

    public openPage( url: string ){
        window.open(url, '_blank');
    }

    public sendMail( address: string ){
        window.open("mailTo:"+address, '_self');
    }

}