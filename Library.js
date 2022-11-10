export class Library {
    constructor() {
        this.books = [];
        this.node = document.querySelector('.container.bottom');

        this.addBookNode = document.getElementById('add-book');
        this.titleNode = document.getElementById('title');
        this.summaryNode = document.getElementById('summary');
        this.pagesNode = document.getElementById('pages');
        this.readNode = document.getElementById('read');
        this.favoriteNode = document.getElementById('favorite');

        this.addBookNode.addEventListener('click', this.#addBook.bind(this));

        console.log('constructing library...');
        this.#addBook();
        this.#addBook();
        this.#addBook();
        this.#addBook();
        this.#addBook();

        this.#updateLibraryNode();
    }
    #addBook() {
        let title = this.titleNode.value || 'empty';
        let summary = this.summaryNode.value || 'empty';
        let pages = Number(this.pagesNode.value) || 0;
        let isRead = this.readNode.checked;
        let isFavorite = this.favoriteNode.checked;
        this.#resetInput();

        this.books.push(new Book(
            title, summary, pages, isRead, isFavorite,
            this.books.length, this.#deleteNode.bind(this)));

        this.#updateLibraryNode();
    }
    #resetInput() {
        this.titleNode.value = '';
        this.summaryNode.value = '';
        this.pagesNode.value = '';
        this.readNode.checked = false;
        this.favoriteNode.checked = false;
    }
    #deleteNode(index) {
        console.log(`callback on index ${index}`);
        this.books.splice(index, 1);
        this.#updateIndicies();
        this.#updateLibraryNode();
    }
    #updateLibraryNode(filterReadBooks, filterFavoriteBooks) {
        while (this.node.hasChildNodes())
            this.node.removeChild(this.node.firstChild);
        for (let book of this.books)
            this.node.appendChild(book.node);
    }
    #updateIndicies() {
        for (let i=0; i<this.books.length; i++) {
            let book = this.books[i];
            book.index = i;
        }
    }
}

export class Book {
    constructor(title, summary, pages, isRead, isFavorite, index, deleteCallback) {
        this.title = title;
        this.summary = summary;
        this.pages = pages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
        this.index = index;

        this.node = document.createElement('div');
        this.node.classList.add('card');

        this.titleNode = this.#makeElement('div', 'title', title);
        this.pagesNode = this.#makeElement('div', 'pages', pages);
        this.summaryNode = this.#makeElement('div', 'summary', summary);
        this.readNode = this.#makeElement('button', 'read');
        this.favoriteNode = this.#makeElement('button', 'favorite');
        this.deleteNode = this.#makeElement('button', 'delete');

        this.readNode.classList.add('svg');
        this.favoriteNode.classList.add('svg');
        this.deleteNode.classList.add('svg');

        this.deleteNode.addEventListener('click', () => deleteCallback(this.index));
    }
    #makeElement(type, className, textContent) {
        let childNode = document.createElement(type);
        childNode.classList.add(className);
        if (textContent)
            childNode.textContent = textContent;
        this.node.appendChild(childNode);
        return childNode;
    }
}
