const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];

const searchMovieHandler = () => {
  const filterTitle = document.getElementById("filter-title").value;
  renderMovies(filterTitle);
};

const renderMovies = (filter = null) => {
  const moviesList = document.querySelector("#movie-list");
  if (moviesList.length === 0) {
    moviesList.classList.remove("visible");
    return;
  } else {
    moviesList.classList.add("visible");
  }
  moviesList.innerHTML = "";

  const filteredMovies = !filter ? movies : movies.filter(m => m.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
      const newMovieElement = document.createElement("li");
      const {info} = movie;
      let text = movie.getFormattedTitle() + " ";
      for (const key in info) {
        if (key !== "title") {
          text += `${key}: ${info[key]}`;
        }
      }
      newMovieElement.textContent = text;
      moviesList.appendChild(newMovieElement);
    });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormattedTitle() {
        return this.info.title.toUpperCase();
    }
  };

  movies.push(newMovie);
  renderMovies();
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
