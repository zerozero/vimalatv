import {Injectable, ViewContainerRef, ViewRef} from "@angular/core";

@Injectable()
export class DynamicPageEditorService{

    private _container: ViewContainerRef;

    public initialise( container: ViewContainerRef ){
        this._container = container;
    }

    public moveUp( viewRef: ViewRef ){
        let d = this._container.indexOf(viewRef);
        if (d > 0)
            this._container.move(viewRef, d-1);
    }

    public moveDown( viewRef: ViewRef ){
        let d = this._container.indexOf(viewRef);
        if (d < this._container.length-1)
            this._container.move(viewRef, d+1);
    }

    public delete( viewRef: ViewRef ){
        let d = this._container.indexOf(viewRef);
        this._container.remove(d)
    }

    public getPageData():any{

        // for (var i=0; i<this._container.length; i++){
        //     let vr :ViewRef = this._container.get(i);
        // }
        // console.log(this._container["_embeddedViews"]);

        let dat = [];

        //access the private _embeddedViews - because we can..
        this._container["_embeddedViews"].forEach((obj) => {
            dat.push(obj.nodes[1].instance.data);
        });
        return dat;
    }
}