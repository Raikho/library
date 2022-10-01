console.log('Hello, World!');

const titleNode = document.querySelector('#title');
const summaryNode = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book')
const libraryNode = document.querySelector('.container.bottom')

addBookButton.addEventListener('click', addBookToLibrary);

let library = [];

function Book(title, summary, pages) {
    this.title = title;
    this.summary = summary;
    this.pages = pages;
    this.favorite = false;
    this.read = false;
}

function addBookToLibrary() {
    let title =  titleNode.value;
    let summary = summaryNode.value;
    if (title === '') return;
    resetInput();

    library.push(new Book(title, summary, 100));
    clearLibraryNode();
    updateLibraryNode()
}

function resetInput() {
    titleNode.value = '';
    summaryNode.value = '';
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
        pagesNode.textContent = book.pages;
        let summaryNode = document.createElement('div');
        summaryNode.classList.add('summary');
        summaryNode.textContent = book.summary;

        let readNode = document.createElement('button')
        readNode.classList.add('read');
        let favoriteNode = document.createElement('button')
        favoriteNode.classList.add('favorite');
        let deleteNode = document.createElement('button')
        deleteNode.classList.add('delete');

        bookNode.appendChild(titleNode);
        bookNode.appendChild(pagesNode);
        bookNode.appendChild(summaryNode);
        bookNode.appendChild(readNode);
        bookNode.appendChild(favoriteNode);
        bookNode.appendChild(deleteNode);

        libraryNode.appendChild(bookNode);
    }
}

