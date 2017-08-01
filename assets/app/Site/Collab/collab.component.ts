import {
    Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild,
    ViewContainerRef, ViewRef
} from "@angular/core";
import {ImageComponent, ImageModel} from "./image.component";
import {VideoComponent, VideoModel} from "./video.component";
import {TextComponent, TextModel} from "./text.component";
import {AudioComponent, AudioModel} from "./audio.component";
import {routerTransition} from "../../router.animations";
import {ActivatedRoute} from "@angular/router";
import {CollabEditorService} from "../../CMS/collab/collab.editor.service";
import {IComponentTemplate} from "./component.template";


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

    @Input('collaborator')

    private sub: any;

    public isPreviewMode: boolean = false;


    txtFactory: ComponentFactory<TextComponent>;
    imgFactory: ComponentFactory<ImageComponent>;
    vidFactory: ComponentFactory<VideoComponent>;
    audFactory: ComponentFactory<AudioComponent>;


    constructor(
        private _resolver: ComponentFactoryResolver,
        private route: ActivatedRoute,
        private collabEditorService: CollabEditorService) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            console.log(params.artist_id);
        });
        this.collabEditorService.initialise(this._container);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private getFactoryForTemplate( template: any ): ComponentFactory<any>{
        if (template instanceof ImageModel){
            return this.imgFactory;
        }else if (template instanceof TextModel){
            return this.txtFactory;
        }else if (template instanceof VideoModel){
            return this.vidFactory
        }else if (template instanceof AudioModel){
            return this.audFactory;
        }
        return null;
    }

    public createComponent( template: any ){

        var cmp: ComponentRef<IComponentTemplate>;
        var viewRef: ViewRef;

        cmp = this._container.createComponent(this.getFactoryForTemplate(template));

        cmp.instance.initialise(template, cmp.hostView);
    }

    ngAfterViewInit() {

        this.txtFactory = this._resolver.resolveComponentFactory(TextComponent);
        this.imgFactory = this._resolver.resolveComponentFactory(ImageComponent);
        this.vidFactory = this._resolver.resolveComponentFactory(VideoComponent);
        this.audFactory = this._resolver.resolveComponentFactory(AudioComponent);



    }
}