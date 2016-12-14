import { Injectable } from '@angular/core';
import { ComponentHandler } from '../models';
declare var componentHandler: ComponentHandler;

export class IMaterialService {
    render() { }
}

@Injectable()
export class MaterialService implements IMaterialService {
    handler: ComponentHandler;
    constructor() {
        this.handler = componentHandler;
    }

    // render on next tick
    render() {
        setTimeout(() => { this.handler.upgradeDom(); }, 0);
    }

}


@Injectable()
export class MockMaterialService implements IMaterialService {
    render() {
        console.log('render called');
    }
}






