export class Library {
    constructor() {
        this.array = [];

        this.addBookNode = document.getElementById('add-book');
        this.titleNode = document.getElementById('title');
        this.summaryNode = document.getElementById('summary');
        this.pagesNode = document.getElementById('pages');
        this.readNode = document.getElementById('read');
        this.favoriteNode = document.getElementById('favorite');

        this.addBookNode.addEventListener('click', this.#addBook.bind(this));

        console.log('constructing library...');
    }
    #addBook() {
        let title = this.titleNode.value || 'empty';
        let summary = this.summaryNode.value || 'empty';
        let pages = Number(this.pagesNode.value) || 0;
        let isRead = this.readNode.checked;
        let isFavorite = this.favoriteNode.checked;
        this.#resetInput();

        this.array.push(new Book(title, summary, pages, isRead, isFavorite));
        console.log('array:', this.array);
    }
    #resetInput() {
        this.titleNode.value = '';
        this.summaryNode.value = '';
        this.pagesNode.value = '';
        this.readNode.checked = false;
        this.favoriteNode.checked = false;
    }
}

export class Book {
    constructor(title, summary, pages, isRead, isFavorite) {
        this.title = title;
        this.summary = summary;
        this.pages = pages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;

        this.node = document.createElement('div');
        this.node.classList.add('card');

        this.titleNode = this.#makeElement('div', 'title', title);
        this.pagesNode = this.#makeElement('div', 'pages', pages);
        this.summaryNode = this.#makeElement('div', 'summary', summary);
        this.readNode = this.#makeElement('button', 'read');
        this.favoriteNode = this.#makeElement('button', 'favorite');
        this.deleteNode = this.#makeElement('button', 'delete');
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
