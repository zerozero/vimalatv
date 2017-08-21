import {IMediaModel} from "../media/imedia.model";

export class DynamicPage{
    constructor(public page_id:string, public artist_id: string, public templates: IMediaModel[], public enabled: boolean) {}

    public clone():DynamicPage{
        return new DynamicPage(this.page_id, this.artist_id, this.templates, this.enabled);
    }

    public reset(original:DynamicPage){
        this.page_id = original.page_id;
        this.artist_id = original.artist_id;
        this.templates = original.templates;
        this.enabled = original.enabled;
    }
}