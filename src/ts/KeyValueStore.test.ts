import { KeyValueStore } from './KeyValueStore';

const kvs = new KeyValueStore();

describe('kvs store', () => {
    
    beforeEach(() => {
        kvs.clean();
    });
    
    it('initialize', () => {
        expect(kvs).toBeTruthy();
    });
    
    it('initial size must be 0', () => {
        expect(kvs.countItems()).toEqual(0);
    });

    it('should be able to add item to store', () => {
        const key = 1;
        const val = 'any string';
        const item: Map<any, any> = kvs.addItem(key, val);

        expect(kvs.countItems()).toEqual(1);
        expect(item).toBeTruthy();
        expect(item.size).toEqual(1);
    });

    it('should be able to get item to store', () => {
        const key = 100;
        const val = 'any thing';
        const item: Map<any, any> = kvs.addItem(key, val);
        const getItem: Map<any, any> = kvs.getItem(key);
        
        expect(kvs.countItems()).toEqual(1);
        expect(getItem).toBeTruthy();
        expect(getItem).toEqual(val);
    });

    it('should be able to remove item from store', () => {
        const key1 = 100;
        const val1 = 'any thing';
        const item: Map<any, any> = kvs.addItem(key1, val1);
        
        expect(kvs.countItems()).toEqual(1);

        const key2 = 200;
        const val2 = 'somethig else';
        const item2: Map<any, any> = kvs.addItem(key2, val2 + '-new');
        expect(kvs.countItems()).toEqual(2);
        
        const delItem: boolean = kvs.delItem(key1);
        expect(delItem).toBeTruthy();
        expect(delItem).toEqual(true);
    });

    it('should be able to list items from store', () => {
        const key1 = 100;
        const val1 = 'any thing';
        const item: Map<any, any> = kvs.addItem(key1, val1);
        
        expect(kvs.countItems()).toEqual(1);

        const key2 = 200;
        const val2 = 'somethig else';
        const item2: Map<any, any> = kvs.addItem(key2, val2);
        expect(kvs.countItems()).toEqual(2);
        
        const listItems: Map<any, any> = kvs.listItems();
        expect(listItems).toBeTruthy();
        expect(listItems.size).toEqual(2);
        listItems.forEach((val: any, key: any) => {
            expect(key).not.toBeNull();
            expect(val).not.toBeNull();
        });
    });

    it('should be able to check size of items from store', () => {
        const key1 = 100;
        const val1 = 'any thing';
        const item: Map<any, any> = kvs.addItem(key1, val1);
        
        expect(kvs.countItems()).toEqual(1);

        const key2 = 200;
        const val2 = 'somethig else';
        const item2: Map<any, any> = kvs.addItem(key2, val2);
        expect(kvs.countItems()).toEqual(2);
        
        const delItem: boolean = kvs.delItem(key1);
        expect(delItem).toBeTruthy();
        expect(delItem).toEqual(true);
        expect(kvs.countItems()).toEqual(1);
    });

    it('should be able to clear items from store', () => {
        const key1 = 100;
        const val1 = 'any thing';
        const item: Map<any, any> = kvs.addItem(key1, val1);
        
        expect(kvs.countItems()).toEqual(1);

        const key2 = 200;
        const val2 = 'somethig else';
        const item2: Map<any, any> = kvs.addItem(key2, val2);
        expect(kvs.countItems()).toEqual(2);
        
        const cleanStore: boolean = kvs.clean();
        expect(cleanStore).toEqual(true);
        expect(kvs.countItems()).toEqual(0);
    });

})
