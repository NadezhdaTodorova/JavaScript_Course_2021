const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

async function sendHtppRequest(method, url, data) {
  //const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);
  //     xhr.responseType = "json";

  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //       // const listofPosts = xhr.response;
  //     };

  //     xhr.onerror = function () {
  //         reject(new Error('Somenthing went wrong!'));
  //     };

  //     xhr.send(JSON.stringify(data));
  //});
  //return promise;

  return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if(response.status >= 200 && response.status < 300){
         return response.json(); 
      } else {
          return response.json().then(errData => {
            throw new Error('Something went wrong - server-side.', errData);
          });
      }
  }).catch(error => {
      console.log(error);
      throw new Error('Something went wrong!');
  });
}

async function fetchPosts() {
  try {
    const responseData = await sendHtppRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHtppRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    sendHtppRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
