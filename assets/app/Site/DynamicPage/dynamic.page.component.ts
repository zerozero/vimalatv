import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output,
    ViewChild,
    ViewContainerRef, ViewRef
} from "@angular/core";
import {ImageComponent} from "./image.component";
import {VideoComponent} from "./video.component";
import {TextComponent} from "./text.component";
import {AudioComponent} from "./audio.component";
import {routerTransition} from "../../router.animations";
import {ActivatedRoute} from "@angular/router";
import {DynamicPageEditorService} from "../../CMS/dynamicPage/page.editor.service";
import {IComponentTemplate} from "./component.template";

import {DynamicPage} from "../../CMS/dynamicPage/dynamic.page.model";
import {DynamicPageService} from "../../CMS/dynamicPage/dynamic.page.service";
import {IMediaModel} from "../../CMS/media/imedia.model";
import {MediaModel} from "../../CMS/media/media.model";



@Component({
    moduleId: module.id.toString(),
    selector: 'app-collab',
    templateUrl: './dynamic.page.component.html',
    styleUrls: ['./dynamic.page.component.css']
})
export class DynamicPageComponent implements OnInit, OnDestroy{


    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    page : DynamicPage;
    protected endpoint: string;

    @Input()
    set collaboration(data: DynamicPage) {
        this.page = data;
    }

    @Output() OnEditComponent : EventEmitter<IMediaModel> = new EventEmitter<IMediaModel>();

    get collaboration(): DynamicPage{ return this.page; }

    protected sub: any;

    @Input()
    public isPreviewMode: boolean = false;


    txtFactory: ComponentFactory<TextComponent>;
    imgFactory: ComponentFactory<ImageComponent>;
    vidFactory: ComponentFactory<VideoComponent>;
    audFactory: ComponentFactory<AudioComponent>;

    constructor(
        private _resolver: ComponentFactoryResolver,
        protected route: ActivatedRoute,
        private dynamicPageService:DynamicPageService,
        private collabEditorService: DynamicPageEditorService) {

    }

    ngOnInit(): void {

        this.collabEditorService.initialise(this._container);

        this.txtFactory = this._resolver.resolveComponentFactory(TextComponent);
        this.imgFactory = this._resolver.resolveComponentFactory(ImageComponent);
        this.vidFactory = this._resolver.resolveComponentFactory(VideoComponent);
        this.audFactory = this._resolver.resolveComponentFactory(AudioComponent);


        //if we are in CMS mode this.page will be populated by the parent component
        if (this.page)
            this.render(this.page.templates);

    }

    ngOnDestroy(): void {

    }

    protected _getPagesOfType(type:string,filterEnabled:boolean){
        this.dynamicPageService
            .getPages(type,filterEnabled)
            .subscribe((pages) => {
                this.page = pages[0];
                this.render(this.page.templates);
            });
    }


    protected _getOnePage(id:string):void {
        this.dynamicPageService
            .getOnePage(this.endpoint, id)
            .subscribe((pages) => {

                this.page = pages[0];
                this.render(this.page.templates);
            });
    }

    private render( templates: IMediaModel[] ){

        this._container.clear();

        templates.forEach((template) => {
            this.createComponent(template);
        });
    }


    private getFactoryForTemplate( template: IMediaModel ): ComponentFactory<any>{
        if (template.type == MediaModel.IMAGE){
            return this.imgFactory;
        }else if (template.type == MediaModel.TEXT){
            return this.txtFactory;
        }else if (template.type == MediaModel.VIDEO){
            return this.vidFactory
        }else if (template.type == MediaModel.AUDIO){
            return this.audFactory;
        }
        return null;
    }

    public createComponent( template: IMediaModel ){

        var cmp: ComponentRef<IComponentTemplate>;

        cmp = this._container.createComponent(this.getFactoryForTemplate(template));

        cmp.instance.initialise(template, cmp.hostView);
        cmp.instance.isEditMode = this.isPreviewMode;
        cmp.instance.OnEditItem.subscribe((data) => {
            this.OnEditComponent.emit(data);
        })
    }

}