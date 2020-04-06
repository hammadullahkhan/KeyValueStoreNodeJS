import * as readline from 'readline';
import { IUserInput, Item } from './common.interfaces';
import { KeyValueStore } from "./KeyValueStore";

export class UserInput {

    private CMD = 'kvs';
    private kvs = new KeyValueStore();

    constructor() {}

    public displayMenu(display: boolean): boolean {
        let menuStr = '';
        menuStr += `\nViafoura, In Memory Key/Value store\n\n`;
        menuStr += `\t- ${this.CMD} add {key} {value}\n`;
        menuStr += `\t- ${this.CMD} get {key}\n`;
        menuStr += `\t- ${this.CMD} del {key}\n`;
        menuStr += `\t- ${this.CMD} list\n`;
        menuStr += `\t- ${this.CMD} size\n`;
        menuStr += `\t- ${this.CMD} clean\n`;
        menuStr += `\t- q (exit)\n`;

        if (display) { this.showMenu(menuStr); }
        
        return true;
    }

    public getUserInput(): boolean {
        this.cliInput();
        return true;
    }

    public processInput(userCmd: string): Item | undefined {
        
        const inputArgs = userCmd.split(' ');
        const cmdObj: IUserInput = {
            command: inputArgs[0].toLowerCase(),
            action: inputArgs[1] ? inputArgs[1].toLowerCase() : undefined,
            key: inputArgs[2] ? inputArgs[2] : undefined,
            value: inputArgs[3] ? inputArgs[3] : undefined
        };    
        
        if (cmdObj.action === undefined) { return undefined };

        const cmdSwitch = cmdObj.command + ' ' + cmdObj.action;
        let item : Item = '';
        switch(cmdSwitch) {
            case `${this.CMD} add`:
                item = this.kvs.addItem(cmdObj.key, cmdObj.value);
            break;
            case `${this.CMD} get`:
                item = this.kvs.getItem(cmdObj.key);
            break;
            case `${this.CMD} del`:
                item = this.kvs.delItem(cmdObj.key);
            break;
            case `${this.CMD} list`:
                const items: Map<any, any> = this.kvs.listItems();
                items.forEach((val: any, key: any) => {
                    item += `\t${key}: ${val}\n`;
                });
            break;
            case `${this.CMD} size`:
                item = this.kvs.countItems();
            break;
            case `${this.CMD} clean`:
                item = this.kvs.clean();
            break;
            default:
                item = 'Bad Command'
        }
        return item;
    }

    private showMenu(str: string) {
        console.log(str);
    }

    private cliInput() {
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
            let output: Item | undefined = ''; 
            while ( userCmd != 'q' ) {
                if (userCmd !== undefined) {
                    output = this.processInput(userCmd);
                    if (output !== undefined) { console.log(output); }
                }
                userCmd = await question(':');
            }
            console.log( 'Thanks for using the Key Value store.\n');
            process.exit(0);
        };
        userInput();
    }
}
