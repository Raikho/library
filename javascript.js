import {Library, Book} from "./Library.js"

let state = {
    title: 'The Title',
};
let book = new Book(state);
let library = new Library();

console.log(book.print());
console.log(library.print());
