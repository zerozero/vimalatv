import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output,
    ViewChild,
    ViewContainerRef, ViewRef
} from "@angular/core";
import {ImageComponent} from "../DynamicPage/image.component";
import {VideoComponent} from "../DynamicPage/video.component";
import {TextComponent} from "../DynamicPage/text.component";
import {AudioComponent} from "../DynamicPage/audio.component";
import {routerTransition} from "../../router.animations";
import {ActivatedRoute} from "@angular/router";
import {DynamicPageEditorService} from "../../CMS/dynamicPage/page.editor.service";
import {IComponentTemplate} from "../DynamicPage/component.template";

import {DynamicPage} from "../../CMS/dynamicPage/dynamic.page.model";
import {DynamicPageService} from "../../CMS/dynamicPage/dynamic.page.service";
import {IMediaModel} from "../../CMS/media/imedia.model";
import {MediaModel} from "../../CMS/media/media.model";
import {DynamicPageComponent} from "../DynamicPage/dynamic.page.component";



@Component({
    moduleId: module.id.toString(),
    selector: 'app-collab',
    templateUrl: '../DynamicPage/dynamic.page.component.html',
    styleUrls: ['../DynamicPage/dynamic.page.component.css']
    // animations: [routerTransition()],
    // host: {'[@routerTransition]': ''}
})
export class CollabComponent extends DynamicPageComponent implements OnInit, OnDestroy{


    // @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    // page : DynamicPage;
    artist_id : string;

    // @Input()
    // set collaboration(data: DynamicPage) {
    //     this.page = data;
    // }
    //
    // @Output() OnEditComponent : EventEmitter<IMediaModel> = new EventEmitter<IMediaModel>();
    //
    // get collaboration(): DynamicPage{ return this.page; }
    //
    // private sub: any;
    //
    // @Input()
    // public isPreviewMode: boolean = false;
    //
    //
    // txtFactory: ComponentFactory<TextComponent>;
    // imgFactory: ComponentFactory<ImageComponent>;
    // vidFactory: ComponentFactory<VideoComponent>;
    // audFactory: ComponentFactory<AudioComponent>;

    // constructor(
    //     private _resolver: ComponentFactoryResolver,
    //     private route: ActivatedRoute,
    //     private dynamicPageService:DynamicPageService,
    //     private collabEditorService: DynamicPageEditorService) {
    //
    //     super(_resolver,route,dynamicPageService,collabEditorService);
    // }

    ngOnInit(): void {
        this.endpoint = DynamicPageService.COLLAB_ENDPOINT;
        this.sub = this.route.params.subscribe(params => {
            if (params.artist_id !== this.artist_id)
                this._getOnePage(params.artist_id);
            this.artist_id = params.artist_id;
        });

        super.ngOnInit();

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // private _getOneCollab(id:string):void {
    //     this.dynamicPageService
    //         .getOnePage(DynamicPageService.COLLAB_ENDPOINT, id)
    //         .subscribe((collabs) => {
    //
    //             this.page = collabs[0];
    //             this.render(this.page.templates);
    //         });
    // }

    // private render( templates: IMediaModel[] ){
    //
    //     this._container.clear();
    //
    //     templates.forEach((template) => {
    //         this.createComponent(template);
    //     });
    // }

    ngAfterViewInit() {



    }

    // private getFactoryForTemplate( template: IMediaModel ): ComponentFactory<any>{
    //     if (template.type == MediaModel.IMAGE){
    //         return this.imgFactory;
    //     }else if (template.type == MediaModel.TEXT){
    //         return this.txtFactory;
    //     }else if (template.type == MediaModel.VIDEO){
    //         return this.vidFactory
    //     }else if (template.type == MediaModel.AUDIO){
    //         return this.audFactory;
    //     }
    //     return null;
    // }
    //
    // public createComponent( template: IMediaModel ){
    //
    //     var cmp: ComponentRef<IComponentTemplate>;
    //
    //     cmp = this._container.createComponent(this.getFactoryForTemplate(template));
    //
    //     cmp.instance.initialise(template, cmp.hostView);
    //     cmp.instance.isEditMode = this.isPreviewMode;
    //     cmp.instance.OnEditItem.subscribe((data) => {
    //         this.OnEditComponent.emit(data);
    //     })
    // }

}