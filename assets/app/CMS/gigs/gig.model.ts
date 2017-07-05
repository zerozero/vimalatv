export class Gig{
    constructor(public gig_id:string,
                public date:Date,
                public venue: string,
                public description:string,
                public enabled: boolean,
                public website?: string,
                public ticketUrl?: string) {}

    public clone():Gig{
        return new Gig(this.gig_id, this.date, this.venue, this.description, this.enabled, this.website, this.ticketUrl);
    }

    public reset(original:Gig){
        this.gig_id = original.gig_id;
        this.date = original.date;
        this.venue = original.venue;
        this.description = original.description;
        this.enabled = original.enabled;
        this.website = original.website;
        this.ticketUrl = original.ticketUrl;
    }
}

