import { KeyValueStore } from './KeyValueStore';

const kvs = new KeyValueStore();
const menuStr = kvs.displayMenu();
console.log(menuStr);
kvs.getUserInput();
