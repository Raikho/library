console.log('Hello, World!');

const titleElement = document.querySelector('#title');
const summaryElement = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book')
const bookHolder = document.querySelector('.container.bottom')

addBookButton.addEventListener('click', addBook);
console.log(titleElement.parentNode);

function addBook() {
    let title = titleElement.value;
    let summary = summaryElement.value;
    if (title === '')
        return;
    titleElement.value = '';
    summaryElement.value = '';

    let book = document.createElement('div');
    book.classList.add('card');
    book.textContent = title;
    bookHolder.appendChild(book);

    console.dir(`title: ${title}, summary: ${summary}`);
}

