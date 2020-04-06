export class KeyValueStore {

    private store = new Map();

    constructor() {}

    public addItem(key: any, value: any): Map<any, any> {
        return this.store.set(key, value);
    }

    public getItem(key: any): Map<any, any> {
        return this.store.get(key);
    }

    public delItem(key: any): boolean {
        return this.store.delete(key);
    }

    public listItems(): Map<any, any> {
        return this.store;
    }

    public countItems(): number {
        return this.store.size;
    }

    public clean() : boolean {
        return this.store.clear() === undefined;
    }
}
