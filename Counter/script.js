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
