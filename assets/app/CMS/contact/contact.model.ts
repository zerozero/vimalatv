export class Contact{

    constructor(public id:string,
                public twitterUrl:string,
                public fbUrl: string,
                public instaUrl:string,
                public email: string) {}

    public clone():Contact{
        return new Contact(this.id, this.twitterUrl, this.fbUrl, this.instaUrl, this.email);
    }

    public reset(original:Contact){
        this.id = original.id;
        this.twitterUrl = original.twitterUrl;
        this.fbUrl = original.fbUrl;
        this.instaUrl = original.instaUrl;
        this.email = original.email;
    }
}

