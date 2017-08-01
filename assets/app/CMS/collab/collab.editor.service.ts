import {Injectable, ViewContainerRef, ViewRef} from "@angular/core";

@Injectable()
export class CollabEditorService{

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
}