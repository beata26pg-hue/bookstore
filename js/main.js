
//get and display books
function renderBooks(books) {

    const bookList = document.querySelector("#bookList");

    bookList.innerHTML = "";

    books.forEach(book => {

        bookList.innerHTML += `
            <article class="book">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p class="author">${book.authorName}  ${book.authorLastName}</p>
                <p class="price">${book.price} ,-</p>
            </article>
        `;

    });
}

const count = books.length;
bookCount.textContent =
    `${count} ${count === 1 ? "bok" : "bøker"} funnet`;
renderBooks(books);
