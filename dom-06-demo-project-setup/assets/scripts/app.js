const startAddMovieBtn = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMoviewButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];
const section = document.getElementById('entry-text');
const ulMovies = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteMovie = deleteMovieModal.querySelector('.btn--passive');
let confirmDeleteMovie = deleteMovieModal.querySelector('.btn--danger');

const toggleBackdrop = () => {
    backDrop.classList.toggle('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
};

const backDropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
};

const clearMovieInputs = () => {
    for(const userInput of userInputs){
        userInput.value = '';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieModalHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    confirmDeleteMovie.replaceWith(confirmDeleteMovie.cloneNode(true));
    confirmDeleteMovie = deleteMovieModal.querySelector('.btn--danger');
    confirmDeleteMovie.addEventListener('click', deleteMovie.bind(null, movieId));


    cancelDeleteMovie.removeEventListener('click', closeMovieDeletionModal);
    cancelDeleteMovie.addEventListener('click', closeMovieDeletionModal)
};

const deleteMovie = (movieId) => {
    let movieIndex = movies.findIndex(movie => movie.Id === movieId);
    movies.splice(movieIndex, 1);
    ulMovies.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.classList = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
        `;
    newMovieElement.addEventListener('click', deleteMovieModalHandler.bind(null, id));
    ulMovies.appendChild(newMovieElement);
};

const updateUI = () => {
    if(movies.length === 0){
        section.style.display = 'block';
    }else {
        section.style.display = 'none';
    }
}

const addMovieHandler = () => {
    const title = userInputs[0].value;
    const image = userInputs[1].value;
    const rating = userInputs[2].value;

    if(title.trim() === '' 
        || image.trim() === '' 
        || rating.trim() === ''
        || +rating < 1 
        || + rating > 5

    ) {
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }

    const newMovie = {
        Id: Math.random().toString(),
        Title: title,
        Image: image,
        Rating: rating
    };

    movies.push(newMovie);
    console.log(movies);
    toggleBackdrop();
    closeMovieModal();
    clearMovieInputs();
    renderNewMovieElement(newMovie.Id, newMovie.Title, newMovie.Image, newMovie.Rating);
    updateUI();
};

startAddMovieBtn.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMoviewButton.addEventListener('click', addMovieHandler);

