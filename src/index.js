const root = document.getElementById('root');
const addBook = document.getElementById('addBook');
const delBook = document.getElementById('delBook');
const bookList = document.getElementById('bookList');

const addBookBtn = document.createElement('button');
const bookNameInput = document.createElement('input');
const delBookBtn = document.createElement('button');
const bookIdInput = document.createElement('input');

addBookBtn.textContent = 'Add Book';
delBookBtn.textContent = 'Delete Book';

addBook.addEventListener('click', addBookHandler);
delBook.addEventListener('click', delBookHandler);

function addBookHandler() {
  console.log('Add Book');
}

function delBookHandler() {
   console.log('Delete Book');
}

addBook.appendChild(bookNameInput);
addBook.appendChild(addBookBtn);

delBook.appendChild(bookIdInput);
delBook.appendChild(delBookBtn);