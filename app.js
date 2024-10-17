//JavaScript Basic

function isPrime(n) {
  if (n <= 1) return false;
  if (n == 2) return true;
  for (let i = 3; i < Math.sqrt(n); i += 2) {
    if (n % i == 0) return false;
  }
  return true;
}

console.log(2, isPrime(2)); //true
console.log(isPrime(5)); //true
console.log(isPrime(7)); //true
console.log(isPrime(12)); //false
console.log(isPrime(13)); // true
console.log(isPrime(19)); //true

function findSecondLargest(arr) {
  if (arr.length < 2) return "Valid array has at least 2 items";

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let item of arr) {
    if (item > largest) {
      secondLargest = largest;
      largest = item;
    } else if (item < largest && item > secondLargest) secondLargest = item;
  }

  return secondLargest;
}

let nums = [25, -4, 7, 9, 13, -11, 21];
let invalidNums = [21];
console.log(findSecondLargest(nums)); //21
console.log(findSecondLargest(invalidNums));

let students = [
  {
    id: 1,
    name: "Nguyen Van A",
    age: 20,
    grades: [8.5, 7.9, 9.0, 8.2],
  },
  {
    id: 2,
    name: "Tran Thi B",
    age: 21,
    grades: [7.5, 8.0, 8.8, 9.2],
  },
  {
    id: 3,
    name: "Le Van C",
    age: 19,
    grades: [9.0, 9.2, 8.7, 8.9],
  },
  {
    id: 4,
    name: "Pham Thi D",
    age: 22,
    grades: [7.8, 8.3, 8.0, 7.5],
  },
  {
    id: 5,
    name: "Hoang Van E",
    age: 20,
    grades: [8.2, 8.5, 8.8, 9.0],
  },
];

console.log(students);

function addStudent(id, name, age) {
  students.push({ id, name, age });
}
addStudent(6, "Nguyen Thi F", 21);

function removeStudent(id) {
  let index = students.findIndex((item) => item.id == id);
  if (index === -1) return "Can not find student";
  students.splice(index, 1);
}
removeStudent(5);

function addGrade(id, grade) {
  let s = students.find((item) => item.id == id);

  if (s == null) return "Can not find student";

  s.grades = grade;
}
addGrade(6, [10, 9.2, 8.7, 8.9]);

function getAverageGrade(id) {
  let s = students.find((item) => item.id == id);

  if (s == null) return "Can not find student";

  if (!Array.isArray(s.grades) || s.grades.length === 0) {
    return "Student has no grades";
  }

  let sum = s.grades.reduce((sum, item) => sum + item, 0);

  return sum / s.grades.length;
}

console.log(getAverageGrade(6));

function getTopStudent() {
  let topStudent = students[0].id;
  let topGrade = 0;
  students.forEach(function (s) {
    let avg = s.grades.reduce((sum, item) => sum + item, 0) / s.grades.length;
    if (avg > topGrade) {
      topStudent = s.id;
      topGrade = avg;
    }
  });
  return students.find((x) => x.id == topStudent);
}

console.log(getTopStudent());
//------------------------------------------------------------------------------
//Function & Scope

//Fibonacci
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const generateFibonacci = (n) => {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(fibonacci(i));
  return arr;
};

console.log(generateFibonacci(10));
//-----------
function memoize(fn) {
  const dict = {};
  return function (...args) {
    const key = JSON.stringify(args);
    // console.log("key:" + key);
    if (key in dict) {
      //   console.log("value:" + dict[key]);
      return dict[key];
    }
    const result = fn(...args);
    dict[key] = result;
    return result;
  };
}

const memoizedFibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

const memoizedGenerateFibonacci = memoize(function (n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(memoizedFibonacci(i));
  return arr;
});

function comparePerformance(n) {
  console.log(`Tính Fibonacci(${n}):`);

  console.time("Fibonacci");
  console.log("Kết quả:", fibonacci(n));
  console.timeEnd("Fibonacci");
  console.time("Generate fibonacci");
  console.log("Kết quả:", generateFibonacci(n));
  console.timeEnd("Generate fibonacci");

  console.time("Fibonacci đc memoize");
  console.log("Kết quả:", memoizedFibonacci(n));
  console.timeEnd("Fibonacci đc memoize");
  console.time("Generate fibonacci đc memoize");
  console.log("Kết quả:", memoizedGenerateFibonacci(n));
  console.timeEnd("Generate fibonacci đc memoize");
}

// comparePerformance(40);

//Task management
const taskStatus = ["todo", "doing", "completed"];
const listTasks = [
  { taskId: 1, description: "task1", status: "todo" },
  { taskId: 2, description: "task2", status: "doing" },
  { taskId: 3, description: "task3", status: "completed" },
];
const createTaskManager = {
  addTask: (description) => {
    const lastId = listTasks[listTasks.length - 1].taskId;
    listTasks.push({
      taskId: lastId + 1,
      description: description,
      status: "todo",
    });
  },
  completeTask: (taskId) => {
    const task = listTasks.find((x) => x.taskId == taskId);

    if (task == null) return "Can not found task";

    task.status = "completed";
  },
  displayTasks: () => {
    console.log(listTasks);
  },
  displayCompletedTasks: () => {
    console.log(listTasks.filter((x) => x.status == "completed"));
  },
  displayPendingTasks: () => {
    console.log(listTasks.filter((x) => x.status != "completed"));
  },
  filterTasks: (condition) => {
    return listTasks.filter(condition);
  },
};

createTaskManager.addTask("Learning JavaScript");

createTaskManager.addTask("Doing homeworks");

createTaskManager.addTask("Playing games");

createTaskManager.displayTasks();

createTaskManager.completeTask(1);

createTaskManager.displayCompletedTasks();

createTaskManager.displayPendingTasks();

// Sử dụng filterTasks với một điều kiện tùy chỉnh
const taskFilter = createTaskManager.filterTasks(
  (task) => task.description.includes("n") && task.status != "completed"
);
console.log("List tasks have name include 'n' :", taskFilter);

// //--------------------------------------------------
// //Library management
class Book {
  constructor(id, title, author, publicationYear, availableCopies = 0) {
    this.id = id;
    this.title = title;
    this.author = author || "Unknown";
    this.publicationYear =
      parseInt(publicationYear) || new Date().getFullYear();
    this.availableCopies = parseInt(availableCopies) || 0;
    this.totalBorrows = 0;
  }
  borrow() {
    if (this.availableCopies <= 0)
      throw new Error("No books available to borrow");
    this.availableCopies--;
    this.totalBorrows++;
  }
  return() {
    this.availableCopies++;
  }
  getInfo() {
    return `${this.id} ${this.title} ${this.author} ${this.publicationYear} ${this.availableCopies}`;
  }
  get available() {
    return this.availableCopies > 0 ? true : false;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
    return this.books.some((x) => x.id == book.id) ? true : false;
  }
  removeBook(bookId) {
    const index = this.books.findIndex((x) => x.id == bookId);

    if (index == -1) return "Can not found this book";

    this.books.splice(index, 1);
  }
  findBookById(bookId) {
    const item = this.books.find((x) => x.id == bookId);
    if (item == null) return "Can not found this book";
    return item;
  }
  borrowBook(bookId) {
    const item = this.books.find((x) => x.id == bookId);
    if (item == null) return "Can not found this book";
    item.borrow();
  }
  returnBook(bookId) {
    const item = this.books.find((x) => x.id == bookId);
    if (item == null) return "This book cannot found";
    item.return();
  }
  //part2
  listAvaiblableBooks() {
    return this.books.filter((x) => x.available);
  }
  mostPopularBook() {
    return this.books.reduce((mostPopular, item) =>
      item.totalBorrows > mostPopular.totalBorrows ? item : mostPopular
    );
  }

  addBooks(...books) {
    let addCount = 0;
    let addFailedCount = 0;
    books.forEach((book) => {
      if (this.addBook(book)) {
        addCount++;
      } else {
        addFailedCount++;
      }
    });
    console.log("add success / failed:", addCount, addFailedCount);
  }

  updateBookInfo(bookId, updatedInfo) {
    const item = this.books.find((x) => x.id == bookId);
    if (item == null) return "This book cannot found";
    Object.assign(item, updatedInfo);
  }

  getBooksByAuthor(author) {
    return this.books.filter(
      (book) =>
        book.author && book.author.toLowerCase() === author.toLowerCase()
    );
  }

  getAveragePulicationYear() {
    const sum = this.books.reduce((total, x) => total + x.publicationYear, 0);
    return (sum / this.books.length).toFixed(0);
  }

  categorizeBooksByDecade() {
    return this.books.reduce((categories, item) => {
      const decade = Math.floor(item.publicationYear / 10) * 10;
      if (categories[decade] == null) categories[decade] = [];
      categories[decade].push(item);
      return categories;
    }, {});
  }

  findBooksByCondition(condition) {
    return this.books.filter(condition);
  }

  get availableBooks() {
    return this.books.length;
  }
}

const lib = new Library("Test library");

const book1 = new Book(1, "Harry", "Test", "1978", 7);
const book2 = new Book(2, "To Kill a Mockingbird", "Harper Lee", "2012", 200);

lib.addBook(book1);
lib.addBook(book2);

lib.borrowBook(1);
console.log(
  `available: ${book1.available}, quantity: ${book1.availableCopies}`
);
console.log("Number of books:", lib.availableBooks);

lib.returnBook(2);
console.log(
  `available: ${book2.available}, quantity: ${book2.availableCopies}`
);

console.log(lib.findBookById(1).getInfo());

lib.removeBook(2);
console.log("Removed a book. New total books:", lib.availableBooks);

//part 2
const book3 = new Book(3, "Abc xyz", "Xyz abc", "2004", 21);
const book4 = new Book(4, "A Bird", "Joshlee", "1999", 171);

lib.addBooks(book3, book4);
console.log("List available books: ", lib.listAvaiblableBooks());

console.log("the most popular book:", lib.mostPopularBook());

lib.updateBookInfo(1, { author: "Nguyen Van A" });

console.log(
  "list books by author(Nguyen Van A):",
  lib.getBooksByAuthor("Nguyen Van A").map((x) => x.title)
);

console.log("Average publication year: ", lib.getAveragePulicationYear());

console.log("categorize:", lib.categorizeBooksByDecade());

console.log(
  "find books have available copies > 100",
  lib.findBooksByCondition((x) => x.availableCopies > 100)
);
//-----------------------------------------------------------------
//Asynchronous & Error handling

const API_URL =
  "https://script.google.com/macros/s/AKfycbwhuP80pxJ91OgHFGRMtKtbZCVrH15zdMTQNymIBchO5S6Mx_GDjjXaRW68_93cCxn5Ww/exec";

class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = "FetchError";
  }
}

class NetworkError extends FetchError {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}
class HttpError extends FetchError {
  constructor(status, statusText) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
  }
}

class NotFoundError extends HttpError {
  constructor() {
    super(404, "Not Found");
    this.name = "NotFoundError";
  }
}

class SheetNotFoundError extends Error {
  constructor(sheetName) {
    super(`Sheet ${sheetName} not found`);
    this.name = "SheetNotFoundError";
    this.sheetName = sheetName;
  }
}
class DataProcessingError extends FetchError {
  constructor(message) {
    super(`Error processing data: ${message}`);
    this.name = "DataProcessingError";
  }
}

async function fetchBookData(sheetName = "Sheet1", url) {
  try {
    const response = await fetch(
      `${url}?sheet=${encodeURIComponent(sheetName)}`
    );

    if (!response.ok) {
      if (response.status == 404) {
        throw new NotFoundError();
      }
      throw new HttpError(response.status, response.statusText);
    }

    const data = await response.json();

    if (data.error == "Sheet not found") {
      throw new SheetNotFoundError(sheetName);
    }

    if (!Array.isArray(data)) {
      throw new DataProcessingError("Error format data fetching");
    }

    const books = data.map((x) => ({
      id: x.ID,
      title: x.Title,
      author: x.Author,
      publicationYear: x.PublicationYear,
      availableCopies: x.AvailableCopies,
    }));

    console.log("Data:", books);

    return books;
  } catch (error) {
    if (error instanceof FetchError) {
      console.log("Error while fetching date from google sheet", error);
      throw error;
    } else if (error.name === "TypeError") {
      throw new NetworkError("Network error occurred");
    } else {
      throw new FetchError("Unexpected error");
    }
  } finally {
    console.log("Fetching data");
  }
}

async function retryRequest(sheetName, url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries}`);

      const result = await fetchBookData(sheetName, url);

      console.log("Request successful");

      return result;
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        console.error(`All ${maxRetries} attempts failed.`);
        throw error;
      }

      console.log(`Retrying in 1 second...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function main() {
  await fetchBookData("Library", API_URL)
    .then((books) => {
      books.forEach((x) => {
        console.log(
          `ID:${x.id} Title:${x.title} Author:${x.author} PublicationYear:${x.publicationYear} AvailableCopies:${x.availableCopies}`
        );
      });
    })
    .catch((error) => {
      if (error instanceof NetworkError) {
        console.error("Network problem:", error.message);
      } else if (error instanceof NotFoundError) {
        console.error("API endpoint not found");
      } else if (error instanceof SheetNotFoundError) {
        console.error("Sheet not found:", error.sheetName);
      } else if (error instanceof HttpError) {
        console.error("HTTP error:", error.status, error.statusText);
      } else if (error instanceof DataProcessingError) {
        console.error("Data processing error:", error.message);
      } else {
        console.error("Unexpected error:", error.message);
      }
    });
  await retryRequest("Libraryy", API_URL, 3);
}
main();
