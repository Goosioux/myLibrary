let myLibrary = [];

//selecting all elements
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const addButton = document.querySelector(".addBook");
const form = document.querySelector(".form");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector('#submit');
const bookShelf = document.getElementById('bookshelf');
const isRead = document.getElementById('isRead');
const readStatus = document.querySelectorAll('.read-status')

//creates book objects
function Book (id, title, author, pages, read){
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//creates book dom elements from form inputs
const addBook = () => {
    let getTitle = document.getElementById('title').value;
    let getAuthor = document.getElementById('author').value;
    let getPages = document.getElementById('pages').value;
    let getStatus = document.getElementById('isRead').checked;
    
    let newBook = new Book(getTitle, getAuthor, getPages, getStatus);
    myLibrary.push(newBook);

    let bookCard = document.createElement('div');
    bookCard.classList.add('card');
    bookShelf.appendChild(bookCard);

    const titleDiv = document.createElement('h1');
    titleDiv.innerHTML = `${getTitle}`;
    bookCard.appendChild(titleDiv);

    const authorDiv = document.createElement('div');
    authorDiv.innerHTML = `${getAuthor}`;
    bookCard.appendChild(authorDiv);

    const pagesDiv = document.createElement('div');
    pagesDiv.innerHTML = `${getPages}` + ' Pages';
    bookCard.appendChild(pagesDiv);

    const readStatus = document.createElement('p');
    readStatus.classList.add('read-status');
    readStatus.addEventListener('click', () => {
        if (readStatus.style.color === 'green') {
            readStatus.style.color = 'red';
            readStatus.textContent = 'Not read yet';
        } else if (readStatus.style.color = 'red') {
            readStatus.style.color = 'green'
            readStatus.textContent = 'Completed';
        }
    });
    bookCard.appendChild(readStatus);

    const bookDelete = document.createElement('span');
    bookDelete.classList.add('book-del-btn');
    bookDelete.textContent = 'X';
    deleteButton.setAttribute("onclick", `deleteBook(${idx})`);
    bookCard.appendChild(bookDelete);

    bookCompleted = () => {
        readStatus.style.color = 'green';
        readStatus.textContent = 'Completed';
    }
    bookNotRead = () => {
        readStatus.style.color = 'red';
        readStatus.textContent = 'Not read yet';
    }
    if(getStatus == true) {
        bookCompleted();
    } else {
        bookNotRead();
    };
    clearValues();
    form.style.display = 'none';
}

submitButton.addEventListener('click', e => {
    e.preventDefault();
    addBook();
});

const openClose = () => {
    if (form.style.display == 'none') {
        form.classList.toggle('hidden');
    } else {
        form.style.display == 'none';
    }
}
const clearValues = () => {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    isRead.checked = false;
}

addButton.addEventListener('click', e => {
    clearValues();
    form.style.display = 'flex';
})
cancelButton.addEventListener('click', e => {
    clearValues();
    form.style.display = 'none'
})
