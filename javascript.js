console.log('Hello, World!');

const titleElement = document.querySelector('#title');
const summaryElement = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book')

addBookButton.addEventListener('click', addBook);

function addBook() {
    let title = titleElement.value;
    let summary = summaryElement.value;
    titleElement.value = '';
    summaryElement.value = '';
    console.dir(`title: ${title}, summary: ${summary}`);
}

