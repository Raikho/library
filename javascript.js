const titleNode = document.querySelector('#title');
const summaryNode = document.querySelector('#summary');
const pagesNode = document.querySelector('#pages');
const readNode = document.querySelector('#read');
const favoriteNode = document.querySelector('#favorite');
const addBookButton = document.querySelector('#add-book')

const bookCounterNode = document.getElementById('book-counter');
const pageCounterNode = document.getElementById('page-counter');
const bookMeterNode = document.getElementById('book-meter');
const pageMeterNode = document.getElementById('page-meter');

const unreadOnlyNode = document.getElementById('show-only-unread');
const favoriteOnlyNode = document.getElementById('show-only-favorite');

const libraryNode = document.querySelector('.container.bottom')
let library = [];

addBookButton.addEventListener('click', addBookToLibrary);
// document.body.addEventListener('click', function(e) {
//     let node = e.target;
//     if (node.classList.contains('read')) {
//         toggleRead(node.parentNode.dataset.index);
//     }
//     if (node.classList.contains('favorite')) {
//         toggleFavorite(node.parentNode.dataset.index);
//     }
//     if (node.classList.contains('delete')) {
//         removeBookFromLibrary(node.parentNode.dataset.index);
//     }
//     if (node.id === 'show-only-unread') {
//         updateLibraryNode();
//     }
//     if (node.id === 'show-only-favorite') {
//         updateLibraryNode();
//     }
// });

function Book(title, summary, pages, isRead, isFavorite, index) {
    this.title = title;
    this.summary = summary;
    this.pages = pages;
    this.read = isRead;
    this.favorite = isFavorite;
    this.index = index;
}

function addBookToLibrary() {
    let title =  titleNode.value || 'empty title';
    let summary = summaryNode.value || 'empty summary';
    let pages = Number(pagesNode.value) || '0';
    let isRead = readNode.checked;
    let isFavorite = favoriteNode.checked;
    resetInput();

    library.push(new Book2(title, summary, pages, isRead, isFavorite, library.length, library));
    updateLibraryNode();
    updateStats();
}

function removeBookFromLibrary(index) {
    console.log(`removing index: ${index}`);
    library.splice(index, 1);

    updateIndicies();
    updateLibraryNode();
    updateStats();
}

function toggleRead(index) {
    let book = library[index];
    book.read = !book.read;
    updateLibraryNode();
    updateStats();
}

function toggleFavorite(index) {
    let book = library[index];
    book.favorite = !book.favorite;
    updateLibraryNode();
}

function updateStats() {
    let books = getTotalBooks();
    let booksRead = getTotalBooks(true);
    let bookPercent = getPercent(booksRead, books);
    let pages = getTotalPages();
    let pagesRead = getTotalPages(true);
    let pagePercent = getPercent(pagesRead, pages);

    bookCounterNode.textContent = `Books Read: ${booksRead} / ${books}`;
    pageCounterNode.textContent = `Pages Read: ${pagesRead} / ${pages}`;
    bookMeterNode.attributes.style.value = `width: ${bookPercent}%`
    pageMeterNode.attributes.style.value = `width: ${pagePercent}%`
}

function getPercent(a, b) {
    if (b == 0) return 0;
    let out = Math.round(a / b * 100);
    return out;
}

function getTotalBooks(isRead=false) {
    if (!isRead) return library.length;

    let sum = 0;
    for (let book of library) {
        if (book.read)
            sum += 1;
    }
    return sum;
}

function getTotalPages(isRead=false) {
    let sum = 0;
    for (let book of library) {
        if (isRead) {
            if (book.read)
                sum += book.pages;
        } else {
            sum += book.pages;
        }
    }
    return sum;
}

function resetInput() {
    titleNode.value = '';
    summaryNode.value = '';
    pagesNode.value = '';
    readNode.checked = false;
    favoriteNode.checked = false;
}

function updateIndicies() {
    for (let i=0; i<library.length; i++) {
        let book = library[i];
        book.index = i;
    }
}

function updateLibraryNode() {


    while (libraryNode.hasChildNodes())
        libraryNode.removeChild(libraryNode.firstChild);

    for (let book of library)
        libraryNode.appendChild(book.node);

    for (let [index, book] of library.entries()) {
        book.index = index;
    }
}

function addStarterBooks() {
    let title = "Harry Potter and the Sorcerer's Stone";
    let summary = 'Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright.';
    let pages = 309;
    library.push(new Book2(title, summary, pages, true, false, library.length, library))


    title = 'The Hobbit'
    summary = 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.'
    pages = 300;
    library.push(new Book2(title, summary, pages, false, true, library.length, library));

    updateLibraryNode();
}

class Book2 {
    constructor(title, summary, pages, isRead, isFavorite, index, library) {
        this.index = index;
        this.library = library;
        this.node = this.makeElement('div', 'card');
        this.node.dataset.index=this.index;

        this.titleNode = this.makeElement('div', 'title', title);
        this.pagesNode = this.makeElement('div', 'pages', pages);
        this.summaryNode = this.makeElement('div', 'summary', summary);
        this.readNode = this.makeElement('button', 'read');
        this.favoriteNode = this.makeElement('button', 'favorite');
        this.deleteNode = this.makeElement('button', 'delete');

        this.read = isRead;
        this.favorite = isFavorite;

        this.node.appendChild(this.titleNode);
        this.node.appendChild(this.pagesNode);
        this.node.appendChild(this.summaryNode);
        this.node.appendChild(this.readNode);
        this.node.appendChild(this.favoriteNode);
        this.node.appendChild(this.deleteNode);

        this.readNode.addEventListener('click', () => {
            this.read = !this.read;
        });
        this.favoriteNode.addEventListener('click', () => {
            this.favorite = !this.favorite;
        });
        this.deleteNode.addEventListener('click', () => {
            console.log(`${this.title} is being deleted from ${this.index} index`);
            this.library.splice(this.index, 1);
            updateLibraryNode();
        });
    }

    get title() {return this.titleNode.textContent;}
    set title(value) {this.titleNode.textContent = value;}
    get summary() {return this.summaryNode.textContent;}
    set summary(value) {this.summaryNode.textContent = value;}
    get pages() {return Number(this.pagesNode.textContent);}
    set pages(value) {this.pagesNode.textContent = value.toString();}
    get read() {return this.readNode.classList.contains('toggled');}
    set read(value) {
        if (value === true) this.readNode.classList.add('toggled');
        else this.readNode.classList.remove('toggled');
    }
    get favorite() {return this.favoriteNode.classList.contains('toggled');}
    set favorite(value) {
        if (value === true) this.favoriteNode.classList.add('toggled');
        else this.favoriteNode.classList.remove('toggled');
    }

    makeElement(type, className, textContent) {
        let node = document.createElement(type);
        node.classList.add(className);
        if (textContent)
            node.textContent = textContent;
        return node;
    };
}

addStarterBooks();
updateStats();
console.log(library);

