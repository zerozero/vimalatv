import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild,
    ViewContainerRef, ViewRef
} from "@angular/core";
import {ImageComponent} from "./image.component";
import {VideoComponent} from "./video.component";
import {TextComponent} from "./text.component";
import {AudioComponent} from "./audio.component";
import {routerTransition} from "../../router.animations";
import {ActivatedRoute} from "@angular/router";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {IComponentTemplate} from "./component.template";
import {IMediaModel, MediaType} from "./MediaModel";
import {Collab} from "../../CMS/collab/collab.model";
import {CollabService} from "../../CMS/collab/collab.service";


@Component({
    moduleId: module.id.toString(),
    selector: 'app-collab',
    templateUrl: './collab.component.html',
    styleUrls: ['./collab.component.css']
    // animations: [routerTransition()],
    // host: {'[@routerTransition]': ''}
})
export class CollabComponent implements OnInit, OnDestroy{


    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    collab : Collab;
    artist_id : string;

    @Input()
    set collaboration(data: Collab) {
        this.collab = data;
    }

    get collaboration(): Collab{ return this.collab; }

    private sub: any;

    public isPreviewMode: boolean = false;


    txtFactory: ComponentFactory<TextComponent>;
    imgFactory: ComponentFactory<ImageComponent>;
    vidFactory: ComponentFactory<VideoComponent>;
    audFactory: ComponentFactory<AudioComponent>;

    constructor(
        private _resolver: ComponentFactoryResolver,
        private route: ActivatedRoute,
        private collabService:CollabService,
        private collabEditorService: CollabEditorService) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (params.artist_id !== this.artist_id)
                this._getOneCollab(params.artist_id);
            this.artist_id = params.artist_id;
        });

        this.collabEditorService.initialise(this._container);

        this.txtFactory = this._resolver.resolveComponentFactory(TextComponent);
        this.imgFactory = this._resolver.resolveComponentFactory(ImageComponent);
        this.vidFactory = this._resolver.resolveComponentFactory(VideoComponent);
        this.audFactory = this._resolver.resolveComponentFactory(AudioComponent);


        //if we are in CMS mode this.collab will be populated by the parent component
        if (this.collab)
            this.render(this.collab.templates);

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private _getOneCollab(id:string):void {
        this.collabService
            .getOne(id)
            .subscribe((collabs) => {

                this.collab = collabs[0];
                this.render(this.collab.templates);
            });
    }

    private render( templates: IMediaModel[] ){

        this._container.clear();

        templates.forEach((template) => {
            this.createComponent(template);
        });
    }

    ngAfterViewInit() {



    }

    private getFactoryForTemplate( template: IMediaModel ): ComponentFactory<any>{
        if (template.type == MediaType.IMAGE){
            return this.imgFactory;
        }else if (template.type == MediaType.TEXT){
            return this.txtFactory;
        }else if (template.type == MediaType.VIDEO){
            return this.vidFactory
        }else if (template.type == MediaType.AUDIO){
            return this.audFactory;
        }
        return null;
    }

    public createComponent( template: IMediaModel ){

        var cmp: ComponentRef<IComponentTemplate>;

        cmp = this._container.createComponent(this.getFactoryForTemplate(template));

        cmp.instance.initialise(template, cmp.hostView);
    }

}