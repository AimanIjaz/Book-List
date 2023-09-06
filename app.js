// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // Create a row
  const row = document.createElement("tr");

  // Add data to this row insert cols
  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "delete">X</a></td>
    `;

  list.appendChild(row);
};

// Show Alert Message
UI.prototype.showAlert = function (message, className) {
  // Add div
  const div = document.createElement("div");
  // Add class name
  div.className = `alert ${className}`;
  // Add text Node
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".container");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert Alert
  container.insertBefore(div, form);
  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear UI fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Istantiate Book
  const book = new Book(title, author, isbn);

  // Istantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    // Clear all fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete

document.getElementById("book-list").addEventListener("click", function (e) {
  // Istantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show msg
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
