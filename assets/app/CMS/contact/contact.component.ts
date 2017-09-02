import {Component, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Contact} from "./contact.model";
import {ContactService} from "./contact.service";
import {isNullOrUndefined} from "util";
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

    onSubmit() {
        this.contactForm.form.markAsPristine();

        if (isNullOrUndefined(this.contact.id)) {
            this.save();
        } else {
            this.update();
        }
    }

    private save(){
        this.contactService
            .add(this.contact)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.contact = data;
                },
                (err) => {
                    console.error(err);
                }
            );
    }

    private update(){
        this.contactService
            .update(this.contact)
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