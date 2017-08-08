export interface IMediaModel {
    media_id: string;
    type: string;
    url?: string;
    title?: string;
    content?: string;
    caption?:string;
    width?: number;
    height?: number;
    enabled?: boolean;
}

export class MediaType {

    public static readonly VIDEO : string = "video";
    public static readonly AUDIO : string = "audio";
    public static readonly TEXT : string = "text";
    public static readonly IMAGE : string = "image";

}