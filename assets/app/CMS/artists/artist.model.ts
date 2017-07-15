export class Artist{

    public id;

    constructor(public artist_id:string,
                public name: string,
                public enabled: boolean) {}

    public clone():Artist{
        return new Artist(this.artist_id, this.name, this.enabled);
    }

    public reset(original:Artist){
        this.artist_id = original.artist_id;
        this.name = original.name;
        this.enabled = original.enabled;
    }
}

