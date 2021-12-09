const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const request = indexedDB.open("budget", 1);
let db;

request.onupgradeneeded = (event) => {
  const db = event.target.result
  db.target.result.createObjectStore("pending", { keyPath: "id", autoIncrement: true});
};

request.onerror = (err) => {
  console.log(err.message);
}

request.onsuccess = (event) => {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(record) {
  const transaction = db.transaction("pending", "readwrite");
  const store = transaction.objectStore("pending");

  store.add(record);
};

