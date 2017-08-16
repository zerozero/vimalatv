import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateFilter'
})
export class TruncateFilterPipe implements PipeTransform {
    transform(text: string, length: number) {
        return text.length > length ? text.substr(0, length)+'...' : text;
    }
}