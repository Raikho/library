console.log('Hello, World!');

const titleNode = document.querySelector('#title');
const summaryNode = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book')
const libraryNode = document.querySelector('.container.bottom')

addBookButton.addEventListener('click', addBookToLibrary);

let myLibrary = [];

function Book(title, summary) {
    this.title = title;
    this.summary = summary;
}

function addBookToLibrary() {
    let title = titleNode.value;
    let summary = summaryNode.value;
    if (title === '')
        return;
    titleNode.value = '';
    summaryNode.value = '';

    let book = new Book(title, summary);

    let bookNode = document.createElement('div');
    bookNode.classList.add('card');
    bookNode.textContent = book.title;
    libraryNode.appendChild(bookNode);

    console.dir(`title: ${title}, summary: ${summary}`);
}

