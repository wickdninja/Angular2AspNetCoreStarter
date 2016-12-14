export class ExtendedArray<T> extends Array<T> {

    constructor(data?: Array<T>) {
        super();
        this.addRange(data);
    }

    addRange(data: Array<T>) {
        if (!data) { return; }
        data.map(item => this.push(item));
    }

    chunkify(size: number): Array<Array<T>> {
        size = (size !== undefined && size !== null && size > 0) ? size : 10;
        let groups = [], i;
        for (i = 0; i < this.length; i += size) {
            groups.push(this.slice(i, i + size));
        }
        return groups;
    }

    groupBy(prop: any) {
        return this.reduce((grouped, item) => {
            let key = this.isFunction(prop) ? prop.apply(this, [item]) : item[prop];
            grouped[key] = grouped[key] || [];
            grouped[key].push(item);
            return grouped;
        }, {});
    }

    private isFunction(obj: any) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
}
