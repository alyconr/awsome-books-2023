import {
  showBookForm,
  showBookList,
  showContactSection,
} from './navigationModule.js';

class BookManager {
  constructor() {
    this.books = [];
    this.attachEventListeners();
    this.loadBooks();
  }

  addBook = (event) => {
    event.preventDefault();

    const bookName = document.getElementById('bookName').value;
    const bookAuthor = document.getElementById('bookAuthor').value;

    if (bookName.trim() === '' || bookAuthor.trim() === '') {
      const inputError = document.getElementById('inputError');
      inputError.style.display = 'block';
      inputError.className = 'alert alert-danger';
      inputError.textContent = 'Please enter both book name and book author';
      return; // If either book name or author is empty, stop the execution
    }
    const inputError = document.getElementById('inputError');
    inputError.textContent = '';
    inputError.style.display = 'none';

    const book = {
      name: bookName,
      author: bookAuthor,
    };

    this.books.push(book);

    this.createTableRow(book);
    this.saveBooksToLocalStorage();

    document.getElementById('bookName').value = '';
    document.getElementById('bookAuthor').value = '';
  };

  editBook = (event) => {
    const row = event.target.closest('tr');
    const nameCell = row.children[0];
    const authorCell = row.children[1];

    const bookNameInput = document.createElement('input');
    bookNameInput.type = 'text';
    bookNameInput.value = nameCell.textContent;
    const bookAuthorInput = document.createElement('input');
    bookAuthorInput.type = 'text';
    bookAuthorInput.value = authorCell.textContent;

    const saveButton = document.createElement('button');
    saveButton.className = 'btn btn-primary';
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => this.saveBook(row, nameCell, authorCell));
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-secondary';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => this.cancelEdit(row, nameCell, authorCell));
    nameCell.textContent = '';
    nameCell.appendChild(bookNameInput);
    authorCell.textContent = '';
    authorCell.appendChild(bookAuthorInput);

    const actionsCell = row.children[2];
    actionsCell.textContent = '';
    actionsCell.appendChild(saveButton);
    actionsCell.appendChild(cancelButton);
  };

  saveBook = (row, nameCell, authorCell) => {
    const bookNameInput = nameCell.querySelector('input');
    const bookAuthorInput = authorCell.querySelector('input');

    const bookName = bookNameInput.value;
    const bookAuthor = bookAuthorInput.value;

    if (bookName && bookAuthor) {
      nameCell.textContent = bookName;
      authorCell.textContent = bookAuthor;
    }

    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    if (rowIndex !== -1) {
      this.books[rowIndex] = {
        name: bookName,
        author: bookAuthor,
      };
      this.saveBooksToLocalStorage();
    }

    window.location.reload();
  };

  cancelEdit = (row, nameCell, authorCell) => {
    const bookNameInput = nameCell.querySelector('input');
    const bookAuthorInput = authorCell.querySelector('input');

    const bookName = bookNameInput.value;
    const bookAuthor = bookAuthorInput.value;

    if (bookName && bookAuthor) {
      nameCell.textContent = bookName;
      authorCell.textContent = bookAuthor;
    } else {
      row.remove();
      const rowIndex = Array.from(row.parentNode.children).indexOf(row);
      if (rowIndex !== -1) {
        this.books.splice(rowIndex, 1);
        this.saveBooksToLocalStorage();
      }
    }

    window.location.reload();
  };

  deleteBook = (row, bookName, bookAuthor) => {
    row.remove();

    const bookIndex = this.books.findIndex(
      (book) => book.name === bookName && book.author === bookAuthor
    );
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      this.saveBooksToLocalStorage();
    }
  };

  createTableRow = (book) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = book.name;
    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    const actionsCell = document.createElement('td');
    actionsCell.className = 'd-flex justify-content-center gap-2';
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-success';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (event) => this.editBook(event));
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => this.deleteBook(row, book.name, book.author));
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(nameCell);
    row.appendChild(authorCell);
    row.appendChild(actionsCell);
    document.getElementById('bookList').appendChild(row);
  };

  saveBooksToLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(this.books));
  };

  loadBooks = () => {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.books.forEach((book) => this.createTableRow(book));
  };

  attachEventListeners = () => {
    const bookForm = document.getElementById('bookForm');
    bookForm.addEventListener('submit', (event) => this.addBook(event));

    const addBookLink = document.getElementById('addBookLink');
    addBookLink.addEventListener('click', () => showBookForm());

    const showListLink = document.getElementById('showListLink');
    showListLink.addEventListener('click', () => showBookList());

    const contactLink = document.getElementById('contactLink');
    contactLink.addEventListener('click', () => showContactSection());

    const awsomeBookLink = document.getElementById('awsomeBooksHome');
    awsomeBookLink.addEventListener('click', () => showBookForm());
  };
}

export default BookManager;
