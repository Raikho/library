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

const libraryNode = document.querySelector('.container.bottom')
let library = [];

addBookButton.addEventListener('click', addBookToLibrary);
document.body.addEventListener('click', function(e) {
    let node = e.target;
    if (node.classList.contains('read')) {
        toggleRead(node.parentNode.dataset.index);
    }
    if (node.classList.contains('favorite')) {
        toggleFavorite(node.parentNode.dataset.index);
    }
    if (node.classList.contains('delete')) {
        removeBookFromLibrary(node.parentNode.dataset.index);
    }
});

addStarterBooks();
updateStats();

function Book(title, summary, pages, isRead, isFavorite, index) {
    this.title = title;
    this.summary = summary;
    this.pages = pages;
    this.read = isRead;
    this.favorite = isFavorite;
    this.index = index;
}

function addBookToLibrary() {
    let title =  titleNode.value;
    let summary = summaryNode.value;
    let pages = pagesNode.value;
    let isRead = readNode.checked;
    let isFavorite = favoriteNode.checked;
    if (title === '') return;
    resetInput();

    library.push(new Book(title, summary, pages, isRead, isFavorite, library.length));
    clearLibraryNode();
    updateLibraryNode();
    updateStats();
}

function removeBookFromLibrary(index) {
    console.log(`removing index: ${index}`);
    library.splice(index, 1);

    updateIndicies();
    clearLibraryNode();
    updateLibraryNode();
    updateStats();
}

function toggleRead(index) {
    let book = library[index];
    book.read = !book.read;
    clearLibraryNode();
    updateLibraryNode();
    updateStats();
}

function toggleFavorite(index) {
    let book = library[index];
    book.favorite = !book.favorite;
    clearLibraryNode();
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

function getTotalPages(isRead) {
    let pages = 0;
    for (let book of library) {
        if (isRead) {
            if (book.read)
                pages += book.pages;
        } else {
            pages += book.pages;
        }
    }
    return pages;
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

function clearLibraryNode() {
    while (libraryNode.hasChildNodes()) {
        libraryNode.removeChild(libraryNode.firstChild);
    }
}

function updateLibraryNode() {
    for (let book of library) {
        let bookNode = document.createElement('div');
        bookNode.classList.add('card');
        
        let titleNode = document.createElement('div');
        titleNode.classList.add('title');
        titleNode.textContent = book.title;
        let pagesNode = document.createElement('div');
        pagesNode.classList.add('pages');
        pagesNode.textContent = book.pages + 'pg';
        let summaryNode = document.createElement('div');
        summaryNode.classList.add('summary');
        summaryNode.textContent = book.summary;

        let readNode = document.createElement('button')
        readNode.classList.add('read');
        if(book.read) 
            readNode.classList.add('toggled');
        let favoriteNode = document.createElement('button')
        favoriteNode.classList.add('favorite');
        if(book.favorite) 
            favoriteNode.classList.add('toggled');
        let deleteNode = document.createElement('button')
        deleteNode.classList.add('delete');

        bookNode.dataset.index = book.index;

        bookNode.appendChild(titleNode);
        bookNode.appendChild(pagesNode);
        bookNode.appendChild(summaryNode);
        bookNode.appendChild(readNode);
        bookNode.appendChild(favoriteNode);
        bookNode.appendChild(deleteNode);

        libraryNode.appendChild(bookNode);
    }
}

function addStarterBooks() {
    let title = "Harry Potter and the Sorcerer's Stone";
    let summary = 'Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright.';
    let pages = 309;
    library.push(new Book(title, summary, pages, true, true, library.length))
    
    title = 'The Hobbit'
    summary = 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.'
    pages = 300;
    library.push(new Book(title, summary, pages, false, false, library.length));

    clearLibraryNode();
    updateLibraryNode();
}
