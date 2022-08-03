class Book {
  constructor(title, author, id = Date.now()) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// accessing the form and the book list container
const bookList = document.querySelector('.book-list');
const form = document.querySelector('#book-form');

/**
 * Method stores an array to the local storage with
 * the key being 'books'
 * @param {array} array
 */
function storeToLocal(array) {
  array = JSON.stringify(array);
  localStorage.setItem('books', array);
}

/**
   *Method returns an array of all stored objects using the
   'books' array
   * @returns {array}
   */
function retrieveFromStorage() {
  return JSON.parse(localStorage.getItem('books'));
}

/**
 * Class used to define a single book-list instance
 */
class BookList {
  constructor() {
    this.list = [];
  }

  /**
   * This method adds a book object to the book list
   * @param {string} title
   * @param {string} author
   */
  addBook(title, author) {
    const book = new Book(title, author);
    this.list.push(book);
    let fromLocalStorage = retrieveFromStorage();
    storeToLocal([...fromLocalStorage, book]);
  }

  /**
   * This method creates a container of elements
   * that are appended to the book list element
   * @param {string} title
   * @param {string} author
   * @param {number} bookId
   */
  populateUi(title, author, bookId) {
    const titleAndAuthor = document.createElement('p');
    titleAndAuthor.classList.add('title-author');
    titleAndAuthor.innerText = `"${title}" by ${author}`;
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';

    // create container and append all these
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    bookContainer.appendChild(titleAndAuthor);
    bookContainer.appendChild(removeBtn);

    bookList.appendChild(bookContainer);

    removeBtn.addEventListener('click', () => {
      bookList.removeChild(bookContainer);

      // we update the local storage as well
      let fromLocal = retrieveFromStorage();
      fromLocal = fromLocal.filter((buk) => buk.id !== bookId);
      storeToLocal(fromLocal);
    });
  }

  /**
   * This method appends only the latest added object
   * added to the UI
   */
  render() {
    const len = this.list.length;
    const latestAddition = this.list[len - 1];
    this.populateUi(
      latestAddition.title,
      latestAddition.author,
      latestAddition.id
    );
  }
}

window.addEventListener('load', () => {
  // Create an instance of the book list class
  const bookListInstance = new BookList();

  // render all books stored in the local storage
  const retrieved = retrieveFromStorage();
  if (retrieved !== null) {
    retrieved.forEach((book) => {
      bookListInstance.populateUi(book.title, book.author, book.id);
    });
  }

  // event listener on the form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // received all user inputs
    const titleReceived = document.getElementById('title').value;
    const authorReceived = document.getElementById('author').value;

    bookListInstance.addBook(titleReceived, authorReceived);
    bookListInstance.render();
  });
});
