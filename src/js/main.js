const readline = require('readline');

const CMD = 'kvs';
const store = new Map();

const menuStr = displayMenu();
console.log(menuStr);
getUserInput();

function getUserInput(){
    var cl = readline.createInterface( process.stdin, process.stdout );
    var question = function(q) {
            return new Promise( (res, rej) => {
                cl.question( q, answer => {
                    res(answer);
                })
            });
    };

    (async function main() {
        var answer;
        while ( answer != 'q' ) {

            if (answer !== undefined) {
                processInput(answer); 
            }

            answer = await question(':');
        }
        console.log( 'Thanks for using the Key Value store.\n');
        process.exit(0);
    })();

}


function processInput(userCmd) {
        
    const inputArgs = userCmd.split(' ');
    const cmdObj = {
        command: inputArgs[0].toLowerCase(),
        action: inputArgs[1] ? inputArgs[1].toLowerCase() : undefined,
        key: inputArgs[2] ? inputArgs[2] : undefined,
        value: inputArgs[3] ? inputArgs[3] : undefined
    };    
    
    if (cmdObj.action === undefined) return;

    const cmdSwitch = cmdObj.command + ' ' + cmdObj.action;
    let item = '';
    switch(cmdSwitch) {
        case `${CMD} add`:
            item = addItem(cmdObj.key, cmdObj.value);
        break;
        case `${CMD} get`:
            item = getItem(cmdObj.key);
        break;
        case `${CMD} del`:
            item = delItem(cmdObj.key);
        break;
        case `${CMD} list`:
            listItems();
            store.forEach((val, key) => {
                console.log(`\t${key}: ${val}`);
            });
        break;
        case `${CMD} size`:
            item = countItems();
        break;
        case `${CMD} clean`:
            item = clean();
        break;
        default:
            item = 'Bad Command'
    }
    console.log('\t', item);        
}

function addItem(key, value) {
    return store.set(key, value);
}

function getItem(key) {
    return store.get(key);
}

function delItem(key) {
    return store.delete(key);
}

function listItems() {
    return store;
}

function countItems() {
    return store.size;
}

function clean() {
    return store.clear() === undefined;
}

function displayMenu() {
    let menuStr = '';
    menuStr += `\nViafoura, In Memory Key/Value store\n\n`;
    menuStr += `\t- ${CMD} add {key} {value}\n`;
    menuStr += `\t- ${CMD} get {key}\n`;
    menuStr += `\t- ${CMD} del {key}\n`;
    menuStr += `\t- ${CMD} list\n`;
    menuStr += `\t- ${CMD} size\n`;
    menuStr += `\t- ${CMD} clean\n`;
    menuStr += `\t- q (exit)\n`;
    return menuStr;
}
