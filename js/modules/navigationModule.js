const hideSections = () => {
  const bookForm = document.getElementById('bookForm');
  bookForm.style.display = 'none';
  const bookList = document.getElementById('bookList');
  bookList.style.display = 'none';
  const tableHead = document.getElementById('table-head');
  tableHead.style.display = 'none';
  const contactSection = document.getElementById('contactSection');
  contactSection.style.display = 'none';
  const inputError = document.getElementById('inputError');
  inputError.style.display = 'none';
};

const showBookForm = () => {
  hideSections();
  const bookForm = document.getElementById('bookForm');
  bookForm.style.display = 'block';
};

const showBookList = () => {
  hideSections();
  const bookForm = document.getElementById('bookForm');
  bookForm.style.display = 'none';
  const bookList = document.getElementById('bookList');
  bookList.style.display = 'table';
  bookList.style.position = 'relative';
  bookList.style.width = '100%';
  const contactSection = document.getElementById('contactSection');
  contactSection.style.display = 'none';
  const tableHead = document.getElementById('table-head');
  tableHead.style.display = 'table';
  tableHead.style.position = 'relative';
  tableHead.style.width = '100%';
};

const showContactSection = () => {
  hideSections();
  const contactSection = document.getElementById('contactSection');
  contactSection.style.display = 'flex';
  contactSection.style.flexDirection = 'column';
  contactSection.style.alignItems = 'center';
};

export { showBookForm, showBookList, showContactSection };
