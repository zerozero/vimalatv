import {IMediaModel} from "./imedia.model";
export class MediaModel {

    public static readonly VIDEO : string = "video";
    public static readonly AUDIO : string = "audio";
    public static readonly TEXT : string = "text";
    public static readonly IMAGE : string = "image";

    public static clone( data: IMediaModel ): IMediaModel{
        return Object.assign({}, data);
    }

}