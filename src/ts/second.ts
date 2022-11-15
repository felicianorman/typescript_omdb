//Services

import { IMovie } from "./newmodels/IMovie";
import { searchMovies } from "./services/movieService";

// searchMovies().then((movies) => {
//   console.log(movies);

//   createHTML(movies);
// });

(document.getElementById("searchForm") as HTMLFormElement).addEventListener(
  "submit",
  async (event: SubmitEvent) => {
    event.preventDefault();

    let searchText: string = (
      document.getElementById("searchText") as HTMLInputElement
    ).value;

    //funktionsanropet
    let movies: IMovie[] = await searchMovies(searchText);
    createHTML(movies);
  }
);

const createHTML = (movies: IMovie[]) => {
    let container = document.getElementById("searchResult") as HTMLDivElement;
    container.innerHTML = " ";

  for (let i = 0; i < movies.length; i++) {
   
    let title = document.createElement("h3");
    let img = document.createElement("img");

    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    container.appendChild(title);
    container.appendChild(img);

    document.body.appendChild(container);
  }
};
