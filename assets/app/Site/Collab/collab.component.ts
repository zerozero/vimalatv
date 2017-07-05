import {
    Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild,
    ViewContainerRef
} from "@angular/core";
import {ImageComponent, ImageModel} from "./image.component";
import {VideoComponent, VideoModel} from "./video.component";
import {TextComponent, TextModel} from "./text.component";
import {AudioComponent, AudioModel} from "./audio.component";
import {routerTransition} from "../../router.animations";
import {ActivatedRoute} from "@angular/router";

export interface IComponentTemplate {
    initialise( data: any );
}

@Component({
    moduleId: module.id.toString(),
    selector: 'app-collab',
    templateUrl: './collab.component.html',
    styleUrls: ['./collab.component.css'],
    // animations: [routerTransition()],
    // host: {'[@routerTransition]': ''}
})
export class CollabComponent implements OnInit, OnDestroy{


    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    @Input('collaborator')

    private sub: any;

    templateDef: any[] = [
        new TextModel("1","Direct trade trust fund microdosing sustainable. Kickstarter palo santo 90's meditation. Lyft PBR&B man braid slow-carb fanny pack taiyaki meditation retro vegan photo booth vexillologist drinking vinegar truffaut. Poutine venmo tumeric, VHS schlitz woke seitan. Pork belly helvetica narwhal, hexagon disrupt pok pok ethical glossier kickstarter slow-carb. +1 vape lo-fi palo santo pinterest cloud bread. Church-key polaroid 90's man bun. Flannel humblebrag lyft thundercats freegan tofu. Four loko flexitarian pug hot chicken marfa iPhone, pitchfork shaman banjo poke vexillologist craft beer copper mug freegan stumptown. Wayfarers poutine kickstarter activated charcoal, hexagon copper mug glossier biodiesel dreamcatcher kitsch.", "New Album Out Now"),
        new ImageModel("2", "https://res.cloudinary.com/ho7hirfls/image/upload/v1498725724/JohnEthridgeVimala_hs4cq9.jpg",undefined,"Vimala and John Etheridge"),
        "audio",
        new ImageModel("1","https://res.cloudinary.com/ho7hirfls/image/upload/v1498725430/Vimala_280x280_apszfk.png","Out of the Sky"),
        new VideoModel("1", "https://www.youtube.com/embed/YzFLEC7RSTw"),
        new AudioModel("1",'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/63497134&amp;color=ff4081&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false')

    ];

    constructor(
        private _resolver: ComponentFactoryResolver,
        private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            console.log(params.artist_id);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit() {
        const txtFactory = this._resolver.resolveComponentFactory(TextComponent);
        const imgFactory = this._resolver.resolveComponentFactory(ImageComponent);
        const vidFactory = this._resolver.resolveComponentFactory(VideoComponent);
        const audFactory = this._resolver.resolveComponentFactory(AudioComponent);

        this.templateDef.forEach((template) => {

            if (template instanceof ImageModel){
               let cmp: ComponentRef<ImageComponent> = this._container.createComponent(imgFactory);
                cmp.instance.initialise(template);
           }

           if (template instanceof TextModel){
               let cmp: ComponentRef<TextComponent> = this._container.createComponent(txtFactory);
               cmp.instance.initialise(template);
           }

            if (template instanceof VideoModel){
                let cmp: ComponentRef<VideoComponent> = this._container.createComponent(vidFactory);
                cmp.instance.initialise(template);
            }

            if (template instanceof AudioModel){
                let cmp: ComponentRef<AudioComponent> = this._container.createComponent(audFactory);
                cmp.instance.initialise(template);
            }

        });


    }
}