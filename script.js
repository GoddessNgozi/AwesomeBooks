const bookList= document.querySelector('.book-list');

document.querySelector('#book-form').addEventListener('submit', (e) => {
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const collection = [
    {
        title: title,
        author: author,
    }
];

// variable to hold the injected html projects
let book = '';
// iterate through the collection
collection.forEach((book) => {
  book += `
    <p>${book.title}</p>
    <p>${book.author}</p>`;
});
// BookList
bookList.innerHTML = book;
});