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
  template: `
      <div fxLayout="column">

          <div fxFlex="32px"></div>
          <div fxFlex="80%" ng2FileDrop [ngClass]="{'nv-file-over': hasBaseDropZoneOver}" (fileOver)="fileOver($event)"
               (onFileDrop)="onFileDrop($event)"
               [uploader]="uploader" class="well well-lg my-drop-zone">
              <h4>Drag and drop image files here (.jpg or .png)</h4>
          </div>

          <md-progress-bar
                  fxFlex="1 0 auto"
                  [color]="'primary'"
                  mode="determinate"
                  [value]="percent">
          </md-progress-bar>

      </div>
  `,
  styles: [`
      .well h4{
          text-align: center;
          color: darkgray;
      }

      .well {
          min-height: 20px;
          padding: 19px;
          margin-bottom: 20px;
          background-color: rgba(255, 64, 129, 0.12);
          border: 1px solid darkgray;
          border-radius: 10px;
      }


      .well-lg {
          padding: 48px;
          border-radius: 20px;
      }

      .my-drop-zone { border: dotted 3px lightgray; }
      .nv-file-over { border: dotted 3px #ff4081; }
  `],
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
      this.percent = 0;
      this.onComplete.emit();
    }

  }





}
