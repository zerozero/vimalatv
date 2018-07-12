export class Quote{
    constructor(public quote_id:string,
                public text:string,
                public enabled:boolean,
                public stars?:number
                ) {}

    public clone(): Quote{
        return Object.assign({}, this);
    }

    public reset( data: Quote): Quote{
        return Object.assign({}, data);
    }
}

