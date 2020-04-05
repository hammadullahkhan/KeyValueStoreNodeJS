import * as readline from 'readline';
import { UserInput } from './index.interfaces';

type Item = Map<any, any> | string | number | boolean;

export class KeyValueStore {

    private CMD = 'kvs';
    private store = new Map();

    constructor() {}

    public displayMenu(): string {
        let menuStr = '';
        menuStr += `\nViafoura, In Memory Key/Value store\n\n`;
        menuStr += `\t- ${this.CMD} add {key} {value}\n`;
        menuStr += `\t- ${this.CMD} get {key}\n`;
        menuStr += `\t- ${this.CMD} remove {key}\n`;
        menuStr += `\t- ${this.CMD} list\n`;
        menuStr += `\t- ${this.CMD} size\n`;
        menuStr += `\t- ${this.CMD} clean\n`;
        menuStr += `\t- q (exit)\n`;
        return menuStr;
    }

    public getUserInput() {
        const cl = readline.createInterface( process.stdin, process.stdout );
        const question = function(q: string) {
            return new Promise<string>( (res, rej) => {
                cl.question( q, (userCmd: string | PromiseLike<string> | undefined) => {
                    res(userCmd);
                })
            });
        };

        const userInput = async() => {
            let userCmd : string = '';
            while ( userCmd != 'q' ) {
                if (userCmd !== undefined) {
                    this.processInput(userCmd); 
                }
                userCmd = await question(':');
            }
            console.log( 'Thanks for using the Key Value store.\n');
            process.exit(0);
        };
        userInput();
    }

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

    private processInput(userCmd: string) {
        
        const inputArgs = userCmd.split(' ');
        const cmdObj: UserInput = {
            command: inputArgs[0].toLowerCase(),
            action: inputArgs[1] ? inputArgs[1].toLowerCase() : undefined,
            key: inputArgs[2] ? inputArgs[2] : undefined,
            value: inputArgs[3] ? inputArgs[3] : undefined
        };    
        
        if (cmdObj.action === undefined) return;

        const cmdSwitch = cmdObj.command + ' ' + cmdObj.action;
        let item: Item = '';
        switch(cmdSwitch) {
            case `${this.CMD} add`:
                item = this.addItem(cmdObj.key, cmdObj.value);
            break;
            case `${this.CMD} get`:
                item = this.getItem(cmdObj.key);
            break;
            case `${this.CMD} remove`:
                item = this.delItem(cmdObj.key);
            break;
            case `${this.CMD} list`:
                this.listItems();
                this.store.forEach((val: any, key: any) => {
                    console.log(`\t${key}: ${val}`);
                });
            break;
            case `${this.CMD} size`:
                item = this.countItems();
            break;
            case `${this.CMD} clean`:
                item = this.clean();
            break;
            default:
                item = 'Bad Command'
        }
        console.log('\t', item);        
    }
}
