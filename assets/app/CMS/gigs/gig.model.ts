export class Gig{

    public id;

    constructor(public gig_id:string,
                public date:Date,
                public venue: string,
                public description:string,
                public enabled: boolean,
                public permanent: boolean,
                public website?: string,
                public ticketUrl?: string) {}

    public clone():Gig{
        return new Gig(this.gig_id, this.date, this.venue, this.description, this.enabled, this.permanent, this.website, this.ticketUrl);
    }

    public reset(original:Gig){
        this.gig_id = original.gig_id;
        this.date = original.date;
        this.venue = original.venue;
        this.description = original.description;
        this.enabled = original.enabled;
        this.permanent = original.permanent;
        this.website = original.website;
        this.ticketUrl = original.ticketUrl;
    }
}

