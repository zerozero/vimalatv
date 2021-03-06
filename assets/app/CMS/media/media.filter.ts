import { Pipe, PipeTransform } from '@angular/core';
import {IMediaModel} from "./imedia.model";

@Pipe({
    name: 'mediaFilter',
    pure: false
})
export class MediaFilterPipe implements PipeTransform {
    transform(allMedia: IMediaModel[], mediaType: string) {
        return allMedia.filter(source => source.type == mediaType);
    }
}