/**
 *Constructor function for making book objects
 * @param {string} title
 * @param {string} author
 * @param {Number} id
 */
function Book(title, author, id = Date.now()) {
  this.title = title;
  this.author = author;
  this.id = id;
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
  window.localStorage.setItem('books', array);
}

/**
   *Method returns an array of all stored objects using the
   'books' array
   * @returns {array}
   */
function retrieveFromStorage() {
  return JSON.parse(window.localStorage.getItem('books'));
}

/**
 * Class used to define a single book-list instance
 */
class BookList {
  /**
   * This method adds a book object to the book list
   * @param {string} title
   * @param {string} author
   */
  static addBook(title, author) {
    const book = new Book(title, author);
    // render book to ui
    this.populateUi(title, author, book.id);

    // make the necessary updates in the ui
    const fromLocalStorage = retrieveFromStorage();
    if (fromLocalStorage !== null) {
      fromLocalStorage.push(book);
      storeToLocal(fromLocalStorage);
    } else {
      storeToLocal([book]);
    }
  }

  /**
   * This method removes an object with the id given from the local storage
   * @param {Number} id
   */
  static removeBook(id) {
    let fromLocal = retrieveFromStorage();
    fromLocal = fromLocal.filter((buk) => buk.id !== id);
    storeToLocal(fromLocal);
  }

  /**
   * This method creates a container of elements
   * that are appended to the book list element
   * @param {string} title
   * @param {string} author
   * @param {number} bookId
   */
  static populateUi(title, author, bookId) {
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
      this.removeBook(bookId);
    });
  }
}

// Carry out all dynamic operations only when the window has loaded
window.addEventListener('load', () => {
  // render all books stored in the local storage
  const retrieved = retrieveFromStorage();
  if (retrieved !== null) {
    retrieved.forEach((book) => {
      BookList.populateUi(book.title, book.author, book.id);
    });
  }

  // event listener on the form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // received all user inputs
    const titleReceived = document.getElementById('title').value;
    const authorReceived = document.getElementById('author').value;
    BookList.addBook(titleReceived, authorReceived);
    form.reset();
  });
});

// ADD NAVIGATION
const navBar = document.querySelector('.nav-bar');
const logo = document.createElement('a');
logo.innerText = 'Awesome Books';
const menu = document.createElement('div');
menu.className = 'menu';
const list = document.createElement('a');
list.innerText = 'List';
const addNew = document.createElement('a');
addNew.innerText = 'Add New';
const contact = document.createElement('a');
contact.innerText = 'Contact';
menu.appendChild(list);
menu.appendChild(addNew);
menu.appendChild(contact);
navBar.appendChild(logo);
navBar.appendChild(menu);

// ADD CONTACT
const contactUs = document.getElementById('contact');
const contactInfo = document.createElement('h2');
contactInfo.innerText = 'Contact information';
const question = document.createElement('p');
question.innerText = 'Do you have any questions or you just want to say "Hello"?';
const youCan = document.createElement('p');
youCan.innerText = 'You can reach out to us!';
const contactDetails = document.createElement('ul');
contactDetails.className = 'contact-details';
const details1 = document.createElement('li');
details1.innerText = 'Our email: johnandngozi@gmail.com';
const details2 = document.createElement('li');
details2.innerText = 'Our phone number: +564-8859507484';
const details3 = document.createElement('li');
details3.innerText = 'Our Address: Surulere, Lagos state, Nigeria.';
contactDetails.appendChild(details1);
contactDetails.appendChild(details2);
contactDetails.appendChild(details3);
contactUs.appendChild(contactInfo);
contactUs.appendChild(question);
contactUs.appendChild(youCan);
contactUs.appendChild(contactDetails);

// ADD FOOTER
const footer = document.getElementById('copyright');
const copyright = document.createElement('p');
copyright.innerText = 'Copyright ...';
footer.appendChild(copyright);

// HIDE SECTIONS
const library = document.querySelector('.library');
const addBook = document.querySelector('.add-book');
list.addEventListener('click', () => {
  bookList.style.display = 'block';
  contactUs.style.display = 'none';
  addBook.style.display = 'none';
  library.style.display = 'block';
});

addNew.addEventListener('click', () => {
  bookList.style.display = 'none';
  contactUs.style.display = 'none';
  addBook.style.display = 'block';
  library.style.display = 'none';
});

contact.addEventListener('click', () => {
  bookList.style.display = 'none';
  contactUs.style.display = 'flex';
  addBook.style.display = 'none';
  library.style.display = 'none';
});

document.querySelector('.date').innerHTML = Date();