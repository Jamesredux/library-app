let seedLibrary = [
    {
        title: "Catch 22",
        author: "Joseph Heller",
        pages: 322,
        read: true
    },
    {
        title: "Tinker Tailor Solier Spy",
        author: "John le Carre",
        pages: 433,
        read: true
    },
    {
        title: "Finnegans Wake",
        author: "James Joyce",
        pages: 644,
        read: false
    },
    {
        title: "Brighton Rock",
        author: "Graham Greene",
        pages: 224,
        read: true
    }            

];

const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || Array.from(seedLibrary);

const bookTable = document.getElementById('library-table');
const addBooks = document.getElementById('new-book-form');
addBooks.addEventListener('submit', addNewBooks);
bookTable.addEventListener('click', deleteBook);

function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        var haveRead = this.read ? "read already" : "not read yet" 
        return  this.title + " by " + this.author + ", " + this.pages 
        + " pages, " + haveRead
    };
};

function addNewBooks(e) {
    e.preventDefault(); // stops the page from reloading
    const newTitle = this.querySelector('#title').value;
    const newAuthor = this.querySelector('#author').value;
    const newPages = this.querySelector('#pages').value;
    const yesRead = this.querySelector('#yesread').checked;
    
    const newBook = new book(newTitle, newAuthor, newPages, yesRead);
    myLibrary.push(newBook);

    console.log(newBook);
    displayBooksTable(myLibrary);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    
    this.reset();
   
};


function displayBooksTable(bookList) {
    bookTable.innerHTML = bookList.map((book, i) => {
        return `
        <div class='book-row index-${i}'>
            <div class="book-detail">${book.title}</div>
            <div class="book-detail">${book.author}</div>
            <div>${book.pages}</div>
            
            <div>${book.read}</div>
            <div><button class='toggle-read' data-read=${i} type='button'>Read/Unread</button></div>
            <div class="delete-book"><input type="submit" data-index=${i}  id="index-${i}"   value="delete" /></div>
        </div>    
        `;
    }).join('');
    setButtons();

};


function setButtons() {

    const bookData = document.querySelectorAll('.delete-book');
    const readButtons = document.querySelectorAll('.toggle-read');

    bookData.forEach(button  => {
    button.addEventListener('submit', deleteBook);
    });

    readButtons.forEach(button => button.addEventListener('click', toggleRead));
}  






function deleteBook(e) {
    console.log("delete")
    if(!e.target.matches('input')) return;

    const el = e.target;
    var result = confirm("Are you sure you want to delete this book");
    if (result) {
        const bookIndex = el.dataset.index;
        myLibrary.splice(bookIndex, 1);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        displayBooksTable(myLibrary);
        e.stopPropagation();
       
    };    
};





function toggleRead(e) {
    
    console.log(this.dataset.read);
    const book = myLibrary[this.dataset.read];
    book.read = !book.read;
    displayBooksTable(myLibrary);
    e.stopPropagation();
    
};


 window.onload = function() {
    displayBooksTable(myLibrary);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
   
}; 

