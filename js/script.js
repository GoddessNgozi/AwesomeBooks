class Book {
  // define a static variable to count all objects that will be created from the book class
  static count = 0;

  // create a ref private field value that will aid us in getting id's for every object created
  #ref;

  constructor(title, author) {
    this.title = title;
    this.author = author;
    Book.count += 1;
    this.#ref = Book.count;
  }

  // getter for quoting the id of every object that will be created
  get id() {
    return this.#ref;
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
    storeToLocal(this.list);
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
      // we update the book list
      this.list = this.list.filter((bok) => bok.id !== bookId);
      // we update the local storage as well
      storeToLocal(this.list);
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
