import { UserInput } from './UserInput';

const userInput = new UserInput();

describe('UserInput Tests', () => {
    
    beforeEach(() => {
        userInput.processInput('kvs clean');
    });
    
    it('initialize', () => {
        expect(userInput).toBeTruthy();
    });

    it('should be able to call the displayMenu()', () => {
        const menuStr = userInput.displayMenu(false);
        expect(menuStr).toEqual(true);
    });

    it('should be able to kvs add 1 test1', () => {
        const key = '1';
        const val = 'test1';
        const cmdResult = userInput.processInput(`kvs add ${key} ${val}`);

        expect(cmdResult).toBeTruthy();
    });

    it('should be able to kvs get 1', () => {
        const key = '1';
        const val = 'test1';
        const cmdResult = userInput.processInput(`kvs add ${key} ${val}`);
        const cmdResult2 = userInput.processInput(`kvs get ${key}`);

        expect(cmdResult2).toBeTruthy();
        expect(cmdResult2).toEqual(val);
    });

    it('should be able to kvs del 1', () => {
        const key = '1';
        const val = 'test1';
        const cmdResult = userInput.processInput(`kvs add ${key} ${val}`);
        const cmdResult2 = userInput.processInput(`kvs del ${key}`);

        expect(cmdResult2).toBeTruthy();
    });

    it('should be able to kvs list', () => {
        const key = '1';
        const val = 'test1';
        const cmdResult = userInput.processInput(`kvs add ${key} ${val}`);
        
        const key2 = '2';
        const val2 = 'test2';
        const cmdResult2 = userInput.processInput(`kvs add ${key2} ${val2}`);
        const cmdResult3 = userInput.processInput(`kvs list`);
        
        expect(typeof cmdResult3).toEqual('string');
        expect(cmdResult3).toBeTruthy();
    });

    it('should be able to kvs size', () => {
        const key = '1';
        const val = 'test1';
        const cmdResult = userInput.processInput(`kvs add ${key} ${val}`);
        
        const key2 = '2';
        const val2 = 'test2';
        const cmdResult2 = userInput.processInput(`kvs add ${key2} ${val2}`);
        const cmdResult3 = userInput.processInput(`kvs size`);
        
        expect(cmdResult3).toEqual(2);
        expect(cmdResult3).toBeTruthy();
    });

    it('should be able to kvs size', () => {
        const key = '1';
        const val = 'test1';
        const cmdResult = userInput.processInput(`kvs add ${key} ${val}`);
        
        const key2 = '2';
        const val2 = 'test2';
        const cmdResult2 = userInput.processInput(`kvs add ${key2} ${val2}`);
        const cmdResult3 = userInput.processInput(`kvs clean`);
        
        expect(cmdResult3).toEqual(true);
        expect(cmdResult3).toBeTruthy();
    });

    it('should check for kvs q', () => {
        const cmdResult = userInput.processInput(`q`);
        expect(cmdResult).toEqual(undefined);
    });

    it('should check for a bad kvs xyz', () => {
        const cmdResult = userInput.processInput(`kvs xyz`);
        expect(cmdResult).toEqual('Bad Command');
    });

    it('should check for a bad kvs xyz', () => {
        const cmdResult = userInput.processInput(`kvs xyz`);
        expect(cmdResult).toEqual('Bad Command');
    });

})
