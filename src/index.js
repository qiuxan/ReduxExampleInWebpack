import { configureStore, current } from '@reduxjs/toolkit';

let recordState;
const  initialState = [];

const rootReducer = (state = initialState, action) => {

  recordState = state;
  switch(action.type) {
    case 'ADD_BOOK':
      return [...state, 
        {
          bookId: action.payload.bookId,
          bookName: `< ${action.payload.bookName}>`,
        }

      ];
      
    case 'DEL_BOOK':
      return state.filter((book) => book.bookId != action.payload.bookId);
    default:
      return [...state];
  }
}

//create store
const store = configureStore({
  reducer: rootReducer,
});


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

function* idGenerator() {
  let id = 0;
  while(true) {
    yield id++;
  }
}
const generateId = idGenerator();
const getNewBookId = ()=>generateId.next().value;


function addBookHandler() {

  const bookName = bookNameInput.value;

  if(bookName) {
    const  bookId = getNewBookId();
    bookNameInput.value = '';
    const action = {
      type: 'ADD_BOOK',
      payload: {
        bookId,
        bookName,
      }

    }

    store.dispatch(action);

  }

}

function delBookHandler() {
  const bookId = bookIdInput.value;
  if(bookId) {
    bookIdInput.value = '';
    const action = {
      type: 'DEL_BOOK',
      payload: {
        bookId,
      }
    }
    store.dispatch(action);
  } 
}
addBook.appendChild(bookNameInput);
addBook.appendChild(addBookBtn);

delBook.appendChild(bookIdInput);
delBook.appendChild(delBookBtn);

const showState = store.subscribe(() => {
  const state = store.getState();
  console.log({state});
});

const showBookList = store.subscribe(() => {
  const currentState = store.getState();

  if(currentState.length != recordState.length) {
    bookList.innerText = '';
    currentState.forEach((book) => {
      createBooklist(book);
    });
  }

});

function createBooklist(info){
  const bookItem = document.createElement('li');
  bookItem.innerText = `bookId: ${info.bookId} bookName: ${info.bookName}`;
  bookList.appendChild(bookItem);
}