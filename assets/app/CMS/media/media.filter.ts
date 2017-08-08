import { Pipe, PipeTransform } from '@angular/core';
import {IMediaModel} from "../../Site/Collab/MediaModel";


@Pipe({ name: 'mediaFilter' })
export class MediaFilterPipe implements PipeTransform {
    transform(allMedia: IMediaModel[], mediaType: string) {
        return allMedia.filter(source => source.type == mediaType);
    }
}