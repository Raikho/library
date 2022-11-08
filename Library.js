export class Library {
    constructor() {
        this.array = [];
        this.array.push(new Book());
    }
    print() {
        let out = 'Library: ';
        for (let book of this.array) {
            out += book.print();
            out += ',';
        }
        return out;
    }
}

export class Book {
    constructor(title, summary, pages, isRead, isFavorite) {
        this.title = title;
        // this.summary = state.summary;
        // this.pages = state.pages;
        // this.read = state.read;
        // this.favorite = state.favorite;
    }
    print() {
        return `Book: ${this.title}`;
    }
}
