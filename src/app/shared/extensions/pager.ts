import { ExtendedArray } from './extended-array';

export class Pager<T> {
    pageSize: number = 10;
    pages: Array<Array<T>>;
    currentPage: Array<T>;
    cursor: number = 0;

    constructor(data?: Array<T>, pageSize?: number, cursor?: number) {
        this.pageSize = (pageSize) ? pageSize : 10;
        this.cursor = (cursor) ? cursor : 0;
        this.pageData(data);
    }

    get currentPageLabel(): number {
        return this.cursor + 1;
    }

    get totalPageLabel(): number {
        return (this.pages.length > 0) ? this.pages.length : 1;
    };

    nextPage() {
        if (this.cursor < this.pages.length - 1) {
            this.cursor++;
        }
        this.currentPage = this.pages[this.cursor];
    }

    previousPage() {
        if (this.cursor > 0) {
            this.cursor--;
        }
        this.currentPage = this.pages[this.cursor];
    }

    private pageData(data?: Array<T>) {
        data = (data) ? data : new Array<T>();
        let chunkable = new ExtendedArray<T>(data);
        this.pages = chunkable.chunkify(this.pageSize);
        this.currentPage = this.pages[this.cursor];
    }
}
