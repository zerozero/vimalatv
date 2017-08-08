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