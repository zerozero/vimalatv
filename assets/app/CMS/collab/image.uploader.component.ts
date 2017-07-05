import {
  Component,
  OnInit,
  EventEmitter,
  ElementRef
}                                   from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions
}                                   from 'ng2-file-upload';

declare var $:any;

const URL = '/collab/upload/';

@Component({
  selector: 'image-uploader-component',
  templateUrl: './image.uploader.component.html',
  styleUrls: ['./image.uploader.component.css'],
  outputs:      ['onComplete']
})
export class ImageUploaderComponent implements OnInit{

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public isLoading :boolean = false;
  private progbar: any;
  private uploadTotal: number;
  private uploadedCount: number;

  percent: number = 1;

  private onComplete: EventEmitter<any> = new EventEmitter();
  private uploaderOptions:FileUploaderOptions = {
    autoUpload: true,
    removeAfterUpload: true,
    isHTML5: true,
    allowedMimeType: ['image/jpeg', 'image/png']
  };

  constructor(
    private el: ElementRef
  ){}

  public fileOver(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileDrop( e:FileList ){
    this.uploadTotal = e.length;
    this.uploadedCount = 0;
    // this.progbar.progress( 'set total', this.uploadTotal );
    this.percent = 0;
  }

  ngOnInit(){

    this.uploader.setOptions(this.uploaderOptions);
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('category', 'collab');
      form.append('enabled', false);
    };

    this.uploader.onAfterAddingFile = ( fileItem: any ) => {
      // this.progbar.progress( 'reset' );
      this.percent = 0;
    }

    this.uploader.onProgressAll = (progress: any) => {
      // this.progbar.progress( 'set percent', progress );
      this.uploadedCount++;
      this.percent = this.uploadedCount/this.uploadTotal*progress;
    }

    this.uploader.onCompleteItem = () => {
      // this.progbar.progress( 'increment' );
      // this.percent = 0;
    }

    this.uploader.onCompleteAll = () => {
      console.log('onCompleteAll');
      this.onComplete.emit();
    }

  }





}
