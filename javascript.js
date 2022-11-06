import {Book} from "./Book.js"

let state = {};
state.title = 'The Title';

let book = new Book(state);

console.log(book.print());
