let plusButton = document.getElementById("increment");
let minusButton = document.getElementById("decrement");
let text = document.getElementById("Text");

let count = 0;

plusButton.addEventListener('click', () => {
    count ++;
    text.innerHTML = count + ": Increment";
  })

  minusButton.addEventListener('click', () => {
    count --;
    text.innerHTML = "Decrement : " + count;
  })
