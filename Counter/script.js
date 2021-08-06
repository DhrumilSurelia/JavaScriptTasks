const IDB = (function init() {
let db = null;
let objectStore = null;
let DBOpenReq = indexedDB.open('CounterDB',3);

DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
});
DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success', db);
});
DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    db = ev.target.result
    console.log('Success',db);
    if(! db.objectStoreNames.contains('counterStore')) {
    objectStore = db.createObjectStore('counterStore', {
        keyPath: 'id'
    });}   
});

document.counterForm.addEventListener('click'), (ev) => {
    ev.preventDefault();

    let count = parseInt(getElementById('Text').value);

    let counter = {
        id: uid(),
        count
    };

    let tx = db.transaction('counterStore','readonly');
    tx.oncomplete = (ev) => {
        console.log(ev)
    }
    tx.onerror = (ev) => {
        console.warn(err)
    }
    let store = tx.objectStore('counterStore');
    let request = store(counter)

    request.onsuccess = (ev) => {
        console.log('Successfully added an object')
    };
    request.onerror = (err) => {
        console.log('Error in request to add')
    }
}
});


console.log(localStorage.getItem('count'));

let plusButton = document.getElementById("increment");
let minusButton = document.getElementById("decrement");
let text = document.getElementById("Text");

let count = parseInt(localStorage.getItem('count')) || 0;

const countElement = document.querySelector('span');

localStorage.setItem('count', count);

countElement.textContent = count;

const setCount = (count) => {
    countElement.textContent = count;
    localStorage.setItem('count', count);
}
plusButton.addEventListener('click', () => {
    count ++;
    setCount(count)
})

minusButton.addEventListener('click', () => {
    count --;
    setCount(count)
})
