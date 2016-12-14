import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LoaderService {
    // Observable sources
    private isVisibleSource = new Subject<boolean>();
    private isSuccessSource = new Subject<string>();
    private isErrorSource = new Subject<string>();
    // Observable streams
    isVisible$ = this.isVisibleSource.asObservable();
    isSuccess$ = this.isSuccessSource.asObservable();
    isError$ = this.isErrorSource.asObservable();

    show() {
        console.log('show loader');
        this.isVisibleSource.next(true);
    }

    hide() {
        console.log('hide loader');
        this.isVisibleSource.next(false);
    }

    success(message: string) {
        this.isSuccessSource.next(message);
    }

    error(message: string) {
        this.isErrorSource.next(message);
    }
}
