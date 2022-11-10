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

        this.showUnreadNode = document.getElementById('show-unread');
        this.showFavoriteNode = document.getElementById('show-favorite');

        this.showUnreadNode.addEventListener('click', () => {
            this.#updateLibraryNode();
        });
        this.showFavoriteNode.addEventListener('click', () => {
            this.#updateLibraryNode();
        });

        this.#addStartingBooks();
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
            this.books.length, this.#deleteBook, this.#updateLibraryNode));

        this.#updateLibraryNode();
    }
    #resetInput() {
        this.titleNode.value = '';
        this.summaryNode.value = '';
        this.pagesNode.value = '';
        this.readNode.checked = false;
        this.favoriteNode.checked = false;
    }
    #deleteBook = (index) => {
        console.log(`callback on index ${index}`);
        this.books.splice(index, 1);
        this.#updateIndicies();
        this.#updateLibraryNode();
    }
    #updateLibraryNode = () => {
        while (this.node.hasChildNodes())
        this.node.removeChild(this.node.firstChild);

        let isOnlyUnread = this.showUnreadNode.checked;
        let isOnlyFavorite = this.showFavoriteNode.checked;

        for (let book of this.books) {
            if (isOnlyUnread && book.isRead == true) continue;
            if (isOnlyFavorite && book.isFavorite == false) continue;
            this.node.appendChild(book.node);
        }
    }
    #updateIndicies() {
        for (let i=0; i<this.books.length; i++) {
            let book = this.books[i];
            book.index = i;
        }
    }

    #addStartingBooks() {
        let title = "Harry Potter and the Sorcerer's Stone";
        let summary = 'Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright.';
        let pages = 309;
        this.books.push(new Book(
            title, summary, pages, true, false,
            this.books.length, this.#deleteBook, this.#updateLibraryNode));
        title = 'The Hobbit';
        summary = 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.'
        pages = 300;
        this.books.push(new Book(
            title, summary, pages, false, true,
            this.books.length, this.#deleteBook, this.#updateLibraryNode));
    }
}

export class Book {
    constructor(title, summary, pages, isRead, isFavorite, index, deleteCallback, updateCallback) {
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

        if (this.isRead)
            this.#toggle(this.readNode);
        if (this.isFavorite)
            this.#toggle(this.favoriteNode);

        this.readNode.addEventListener('click', () => {
            this.#toggle(this.readNode);
            this.isRead = this.readNode.classList.contains('toggled');
            updateCallback();
        });
        this.favoriteNode.addEventListener('click', () => {
            this.#toggle(this.favoriteNode);
            this.isFavorite = this.favoriteNode.classList.contains('toggled');
            updateCallback();
        });
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
    #toggle(node) {
        node.classList.toggle('toggled');
    }
}
