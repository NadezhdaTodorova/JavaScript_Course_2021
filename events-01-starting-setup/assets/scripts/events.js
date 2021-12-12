const button = document.querySelector('button');

const buttonClickHandler = () => {
    alert('Button was clicked');
}

const anotherButtonClickHandler = () => {
    console.log('This was cliked!');
}

button.addEventListener('click', buttonClickHandler);

setTimeout(() => {
    button.removeEventListener('click', buttonClickHandler);
}, 2000);

// window.addEventListener('scroll', event => {
//     console.log(event);
// });


// let curElementNumber = 0;
 
// function scrollHandler() {
//     const distanceToBottom = document.body.getBoundingClientRect().bottom;
 
//     if (distanceToBottom < document.documentElement.clientHeight + 150) {
//         const newDataElement = document.createElement('div');
//         curElementNumber++;
//         newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
//         document.body.append(newDataElement);
//     }
// }
 
// window.addEventListener('scroll', scrollHandler);

// const form = document.querySelector("form");
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   console.log(event);
// });

const list = document.querySelector('ul');
const listItems = document.querySelectorAll('li');

list.addEventListener('click', event => {
    console.log(event.target.closest('li'));
    event.target.closest('li').classList.toggle('highlight');
});
