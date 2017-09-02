import {Component, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Contact} from "./contact.model";
import {ContactService} from "./contact.service";
@Component({
    selector: 'cms-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

    @ViewChild('contactForm') contactForm: NgForm;

    contact: Contact = new Contact(null,"","","","");

    constructor(private contactService:ContactService){}

    ngOnInit(): void {
        console.log("poo");
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

    onSubmit(){
        this.contactForm.form.markAsPristine();
        this.contactService
            .add(this.contact)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    console.error(err);
                }
            );
    }
}