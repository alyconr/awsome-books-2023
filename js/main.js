function addBook(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get input values
  const bookName = document.getElementById('bookName').value;
  const bookAuthor = document.getElementById('bookAuthor').value;

  // Create table row element
  const row = document.createElement('tr');

  // Create table cells for each input
  const nameCell = document.createElement('td');
  nameCell.textContent = bookName;
  const authorCell = document.createElement('td');
  authorCell.textContent = bookAuthor;

  // Create actions cell
  const actionsCell = document.createElement('td');
  actionsCell.className = 'd-flex justify-content-center gap-2';

  // Create edit button
  const editButton = document.createElement('button');
  editButton.className = 'btn btn-success';
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', editBook);

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener(
    'click',
    deleteBook.bind(null, row, bookName, bookAuthor)
  );

  // Append cells to row
  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
  row.appendChild(nameCell);
  row.appendChild(authorCell);
  row.appendChild(actionsCell);

  const bookList = document.getElementById('bookList');
  bookList.appendChild(row);

  // Save book data to localStorage
  const books = JSON.parse(localStorage.getItem('books')) || []; // Get the books from localStorage and parse the JSON string or return an empty array if there are no books
  const book = { name: bookName, author: bookAuthor };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books)); // Save the books to localStorage as a JSON string

  // Clear form
  document.getElementById('bookName').value = '';
  document.getElementById('bookAuthor').value = '';
}

// Function to edit books
function editBook(event) {
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
  saveButton.addEventListener(
    'click',
    saveBook.bind(null, row, nameCell, authorCell)
  ); // Bind the row, nameCell and authorCell to the saveBook function

  const cancelButton = document.createElement('button');
  cancelButton.className = 'btn btn-secondary';
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener(
    'click',
    cancelEdit.bind(null, row, nameCell, authorCell)
  );

  nameCell.textContent = '';
  nameCell.appendChild(bookNameInput);
  authorCell.textContent = '';
  authorCell.appendChild(bookAuthorInput);

  const actionsCell = row.children[2];
  actionsCell.textContent = '';
  actionsCell.appendChild(saveButton);
  actionsCell.appendChild(cancelButton);
}

// Function to save books
function saveBook(
  row,
  nameCell,
  authorCell,
  originalBookName,
  originalBookAuthor
) {
  const bookNameInput = nameCell.querySelector('input');
  const bookAuthorInput = authorCell.querySelector('input');

  const bookName = bookNameInput.value;
  const bookAuthor = bookAuthorInput.value;

  if (bookName && bookAuthor) {
    // If both inputs have values
    nameCell.textContent = bookName;
    authorCell.textContent = bookAuthor;
  } else {
    nameCell.textContent = originalBookName;
    authorCell.textContent = originalBookAuthor;
  }

  // Update the book data in localStorage
  const books = JSON.parse(localStorage.getItem('books')); // Get the books from localStorage and parse the JSON string
  const rowId = Array.from(row.parentNode.children).indexOf(row);
  if (books && rowId !== -1) {
    books[rowId] = { name: bookName, author: bookAuthor };
    localStorage.setItem('books', JSON.stringify(books));
  }
  window.location.reload();
}

// Function to cancel edit
function cancelEdit(row, nameCell, authorCell) {
  const bookNameInput = nameCell.querySelector('input');
  const bookAuthorInput = authorCell.querySelector('input');

  const bookName = bookNameInput.value;
  const bookAuthor = bookAuthorInput.value;

  if (bookName && bookAuthor) {
    nameCell.textContent = bookName;
    authorCell.textContent = bookAuthor;
  } else {
    row.remove();

    // Remove the book from localStorage
    const books = JSON.parse(localStorage.getItem('books'));
    const rowId = Array.from(row.parentNode.children).indexOf(row);
    if (books && rowId !== -1) {
      books.splice(rowId, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  window.location.reload();
}

function deleteBook(row, bookName, bookAuthor) {
  row.remove();

  // Remove the book from localStorage
  const books = JSON.parse(localStorage.getItem('books'));
  const bookIndex = books.findIndex(
    (book) => book.name === bookName && book.author === bookAuthor
  );
  if (books && bookIndex !== -1) { // If the book is found in localStorage remove it
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Load books from localStorage on page load
function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.forEach((book) => {
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
    editButton.addEventListener('click', editBook);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener(
      'click',
      deleteBook.bind(null, row, book.name, book.author)
    );
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(nameCell);
    row.appendChild(authorCell);
    row.appendChild(actionsCell);
    document.getElementById('bookList').appendChild(row);
  });
}

// Attach event listeners
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', addBook);

// Load books on page load
loadBooks();
