//button event listeners
const addButton = document.querySelector('.addBook');
addButton.addEventListener('click', () => form.style.display = 'flex');

const newBookButton = document.querySelector('#submit');
newBookButton.addEventListener('click', addBookToLibrary);

const cancelButton = document.querySelector('#cancel');
cancelButton.addEventListener('click', () => form.style.display = 'none')

const form = document.querySelector('.form')

class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value + "pg";
        this.read = form.read.checked;
    }
}

let myLibrary = [];
let newBook;

//ties all functions together when submit clicked on form
function addBookToLibrary(event) {
    event.preventDefault();
    form.style.display = 'none';
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    setData();  //saves updated array in local storage
    render();
    form.reset();
    console.log(myLibrary);
} 

//renders the contents of mylibrary to a dom element
function render() {
    const bookShelf = document.getElementById('bookshelf');
    const books = document.querySelectorAll('.book');
    books.forEach(book => bookShelf.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

//creates book Dom elements to then render in render function
function createBook(item) {
    const library = document.querySelector('#bookshelf');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const isRead = document.createElement('button');
    const bottomDiv= document.createElement('div');
    const removeButton = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));
    
    titleDiv.textContent = item.title;
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    bookDiv.appendChild(authorDiv);

    pagesDiv.textContent = item.pages;
    bookDiv.appendChild(pagesDiv);

    bottomDiv.classList.add('cardBottom')
    bookDiv.appendChild(bottomDiv)

    bottomDiv.appendChild(isRead);
    if (item.read == false) {
        isRead.textContent = 'Not read';
        isRead.setAttribute('id', 'isNotRead');
    } else {
        isRead.textContent = 'Read';
        isRead.setAttribute('id', 'isRead');
    };

    removeButton.textContent = 'Remove';
    removeButton.setAttribute('id', 'removeBtn');
    bottomDiv.appendChild(removeButton);


    library.appendChild(bookDiv);

    removeButton.addEventListener('click', ()=> {
        myLibrary.splice(myLibrary.indexOf(item), 1)
        setData();
        render();
    });

    isRead.addEventListener('click', ()=> {
        item.read = !item.read;
        setData();
        render();
    });
};
// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();
