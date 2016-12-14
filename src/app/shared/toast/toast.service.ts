import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ToastService {
    private messageSource = new Subject<string>();
    messages$ = this.messageSource.asObservable();
    constructor() { }
    show(message: string) {
        console.log('show toast');
        this.messageSource.next(message);
    }
}
