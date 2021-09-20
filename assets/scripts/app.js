const deleteModal = document.getElementById('delete-modal');
const addMovieBtn = document.querySelector("header").children[1];
const addModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const addBtnOnModal = addModal.lastElementChild.lastElementChild;
const cancelBtnOnModal = addModal.lastElementChild.firstElementChild;
const userInputs = document.querySelectorAll("input");
const entryText = document.getElementById("entry-text");

const movies = [];

const closeMovieModal = () => {
  addModal.classList.remove("visible");
  };

const addMovieModal = () => {
    addModal.classList.add('visible');
    toggleBackdrop();
}

const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
};

const closeMovieDeletionBtn = () => {
    backdrop.classList.remove('visible');
    deleteModal.classList.remove('visible');
}

const deleteMovieHandler = (id) =>{
    let movieIndex = 0 ;
    for(const movie of movies){
        if(movie.id === id){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex,1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    closeMovieDeletionBtn();
    updateUI();
}

const confirmationBeforeDeletingMovieelment = (movieId) => {
    toggleBackdrop();
    deleteModal.classList.add('visible');
    const deleteModalCancelBtn = deleteModal.lastElementChild.firstElementChild;
    //console.log(deleteModalCancelBtn);
    let deleteModalConfirmBtn = deleteModal.lastElementChild.lastElementChild;
    //console.log(deleteModalConfirmBtn);
    deleteModalConfirmBtn.replaceWith(deleteModalConfirmBtn.cloneNode(true));

    deleteModalConfirmBtn = deleteModal.lastElementChild.lastElementChild;

    deleteModalCancelBtn.removeEventListener('click' , closeMovieDeletionBtn)

    deleteModalCancelBtn.addEventListener('click' , closeMovieDeletionBtn);
    deleteModalConfirmBtn.addEventListener('click' , deleteMovieHandler.bind(null,movieId));
}

const renderNewMoviesHandler = (id,title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
  newMovieElement.addEventListener('click', confirmationBeforeDeletingMovieelment.bind(null,id));
};

const clearInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const toggleBackdrop = () => {
   backdrop.classList.toggle("visible");
};

const backdropClickHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  deleteModal.classList.remove('visible');
};

const cancelMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    +ratingValue.trim() === "" ||
    +ratingValue > 5 ||
    +ratingValue < 1
  ) {
    alert("please enter valid values (rating between 1 and 5)");
    return;
  }

  const newMovies = {
      id: Math.random().toString(),
    title: titleValue,
    imgUrl: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovies);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
  renderNewMoviesHandler(newMovies.id,newMovies.title, newMovies.imgUrl, newMovies.rating);
  updateUI();
};

//add movie modal by clicking header btn
addMovieBtn.addEventListener("click", addMovieModal);

//listener on Add btn on modal to add movies after filling the form
addBtnOnModal.addEventListener("click", addMovieHandler);

//listener on backdrop to remove backdrop and modal after clicking on backdrop
backdrop.addEventListener("click", backdropClickHandler);

//listener on cancel btn to remove backdrop and modal
cancelBtnOnModal.addEventListener("click", cancelMovieHandler);
