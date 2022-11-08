export class Library {
    constructor() {
        this.array = [];

        this.addBookNode = document.getElementById('add-book');
        this.titleNode = document.getElementById('title');
        this.summaryNode = document.getElementById('summary');
        this.pagesNode = document.getElementById('pages');
        this.readNode = document.getElementById('read');
        this.favoriteNode = document.getElementById('favorite');

        this.addBookNode.addEventListener('click', this.addBook.bind(this));

        console.log('constructing library...');
    }
    addBook() {
        let title = this.titleNode.value || 'empty';
        let summary = this.summaryNode.value || 'empty';
        let pages = Number(this.pagesNode.value) || 0;
        let isRead = this.readNode.checked;
        let isFavorite = this.favoriteNode.checked;
        this.resetInput();

        console.log('adding book =>',{title, summary, pages, isRead, isFavorite});
    }
    resetInput() {
        this.titleNode.value = '';
        this.summaryNode.value = '';
        this.pagesNode.value = '';
        this.readNode.checked = false;
        this.favoriteNode.checked = false;
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
