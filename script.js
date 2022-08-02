const bookList = document.querySelector('.book-list');
const form = document.querySelector('#book-form');

// book collection
let collection = [];

/**
 * This method adds a book to the collection
 */
function addBook() {
  const titleReceived = document.getElementById('title').value;
  const authorReceived = document.getElementById('author').value;
  const book = {
    title: titleReceived,
    author: authorReceived,
    bookId: collection.length,
  };
  collection.push(book);
}

/**
 * Renders all the books in the array to the UI
 * @param {Array} collection
 */
function addToBookList(book) {
  // create all necessary variables
  const bookTitle = document.createElement('h2');
  bookTitle.innerText = book.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = book.author;
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  const hr = document.createElement('hr');

  // create container and append all these
  const bookContainer = document.createElement('div');
  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(removeBtn);
  bookContainer.appendChild(hr);

  // append all this to the book list div element
  bookList.appendChild(bookContainer);

  // removing a book and updating the collection array
  removeBtn.addEventListener('click', () => {
    bookList.removeChild(bookContainer);
    // update collection
    collection = collection.filter((obj) => {
      return obj.bookId !== book.bookId;
    });
  });
}

// event listener on the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
  addToBookList(collection[collection.length - 1]);
});
