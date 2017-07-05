import {IComponentTemplate} from "../../Site/Collab/collab.component";

export class Collab{
    constructor(public collab_id:string, public artist_id: string, public templates: IComponentTemplate[], public enabled: boolean) {}

    public clone():Collab{
        return new Collab(this.collab_id, this.artist_id, this.templates, this.enabled);
    }

    public reset(original:Collab){
        this.collab_id = original.collab_id;
        this.artist_id = original.artist_id;
        this.templates = original.templates;
        this.enabled = original.enabled;
    }
}