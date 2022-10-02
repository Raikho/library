console.log('Hello, World!');

const titleNode = document.querySelector('#title');
const summaryNode = document.querySelector('#summary');
const pagesNode = document.querySelector('#pages');
const readNode = document.querySelector('#read');
const favoriteNode = document.querySelector('#favorite');
const addBookButton = document.querySelector('#add-book')
const libraryNode = document.querySelector('.container.bottom')

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

let library = [];

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
}

function removeBookFromLibrary(index) {
    console.log(`removing index: ${index}`);
    library.splice(index, 1);

    updateIndicies();
    clearLibraryNode();
    updateLibraryNode();
}

function toggleRead(index) {
    let book = library[index];
    book.read = !book.read;
    clearLibraryNode();
    updateLibraryNode();
}

function toggleFavorite(index) {
    let book = library[index];
    book.favorite = !book.favorite;
    clearLibraryNode();
    updateLibraryNode();
}

function resetInput() {
    titleNode.value = '';
    summaryNode.value = '';
}

function updateIndicies() {
    for (let i=0; i<library.length; i++) {
        let book = library[i];
        book.index = i;
    }
}

function clearLibraryNode() {
    console.dir(libraryNode);
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
    let title = 'Cool Book';
    let summary = 'Detailed Summary of Book...';
    let pages = 99;
    library.push(new Book(title, summary, pages, library.length))
    
    title = 'Another Book Title'
    summary = 'This summary is longer and better...'
    pages = 200;
    library.push(new Book(title, summary, pages, library.length));

    clearLibraryNode();
    updateLibraryNode();
}
addStarterBooks();