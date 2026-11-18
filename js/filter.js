//search box 
const searchInput = document.getElementById("searchInput");
const bookList = document.getElementById("bookList");

//chckbox language
const languageCheckboxes = document.querySelectorAll(".checkbox-language");

//chckbox language
const categoryCheckboxes = document.querySelectorAll(".checkbox-cat");
//ddl sort filter
const sortFilter = document.getElementById("sortFilter");

//result count text
const bookCount = document.getElementById("bookCount");

//Checbox Language/category filter and search function 
function filterBooks() {
    //Get search text
    const searchText = searchInput.value.toLowerCase().trim();

    // Get selected language
    const selectedLanguages = Array.from(languageCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    console.log(selectedLanguages, "selectedLanguages");

    // Get selected Categories
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    console.log(selectedCategories, "selectedCategories");

    // Filter books based on search text, selected languages and categories
    const filteredBooks = books.filter(book => {
        // Check if the search text includes the book title or matches authors first name, last name or full name
        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.authorName.toLowerCase() === searchText ||
            book.authorLastName.toLowerCase() === searchText ||
            (book.authorName + " " + book.authorLastName).toLocaleLowerCase().includes(searchText)
        //Chceck if books matcher selectd languages, default shows all
        const matchesLanguage =
            selectedLanguages.length === 0 ||
            selectedLanguages.includes(book.language);
        //Chceck if books matcher selectd categories, default shows all
        const matchesCategories =
            selectedCategories.length === 0 ||
            selectedCategories.includes(book.category.toLocaleLowerCase());

        return matchesSearch && matchesLanguage && matchesCategories;
    });
    // results count, singular og plural text based on result count
    const count = filteredBooks.length;
    bookCount.textContent =
        `${count} ${count === 1 ? "bok" : "bøker"} funnet`;

    // JS arrow function for sortering
    switch (sortFilter.value) {
        case "a-z":
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "popular":
            filteredBooks.sort((a, b) => b.popularity - a.popularity);
            break;
        case "new":
            filteredBooks.sort((a, b) => b.id - a.id);
            break;
        case "highPrice":
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
        case "lowPrice":
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
    }
    renderBooks(filteredBooks);
}



// Seach filter
searchInput.addEventListener("input", filterBooks);

// Language checkbox filter 
languageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", filterBooks);
});

// Category checkbox filter 
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", filterBooks);
});

sortFilter.addEventListener("change", filterBooks);

// Get and dispaly books
renderBooks(books);




