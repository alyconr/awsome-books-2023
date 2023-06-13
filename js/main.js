import BookManager from './bookManager.js';

const bookManager = new BookManager();

document.getElementById('BookForm').addEventListener('submit', (event) => bookManager.addBook(event));
