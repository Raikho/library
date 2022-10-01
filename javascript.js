console.log('Hello, World!');

const titleNode = document.querySelector('#title');
const summaryNode = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book')
const libraryNode = document.querySelector('.container.bottom')

addBookButton.addEventListener('click', addBookToLibrary);

let library = [];

function Book(title, summary) {
    this.title = title;
    this.summary = summary;
}

function addBookToLibrary() {
    let title =  titleNode.value;
    let summary = summaryNode.value;
    if (title === '') return;
    resetInput();

    library.push(new Book(title, summary));
    clearLibraryNode();
    updateLibraryNode()
}

function resetInput() {
    titleNode.value = '';
    summaryNode.value = '';
}

function updateLibraryNode() {
    for (let book of library) {
        let bookNode = document.createElement('div');
        bookNode.classList.add('card');
        bookNode.textContent = book.title;
        libraryNode.appendChild(bookNode);
    }
}

function clearLibraryNode() {
    console.dir(libraryNode);
    while (libraryNode.hasChildNodes()) {
        libraryNode.removeChild(libraryNode.firstChild);
    }
}

