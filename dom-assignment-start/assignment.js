const first = document.getElementById("task-1");
first.style.backgroundColor = "black";
first.style.color = "white";

const second = document.querySelector("#task-1");
console.log(second);
second.style.backgroundColor = "black";
second.style.color = "white";

const third = document.querySelector('li:first-of-type');
third.style.backgroundColor = "black";
third.style.color = "white";


const title = document.querySelector('title');
title.textContent = 'Assigment - Solved!';

const title2 = document.head.querySelector('title');
title2.textContent = 'Assigment - Solved!'

const h1 = document.querySelector('h1');
h1.textContent = 'Assigment - Solved!';