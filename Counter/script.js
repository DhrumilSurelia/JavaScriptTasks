let plusButton = document.getElementById("increment");
let text = document.getElementById("Text");

let count = 0;

plusButton.addEventListener('click', () => {
    count ++;
    text.innerHTML = count;
  })