import axios from "axios";
import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";
import { IOmdbResponse } from "./models/IOmdbResponse";


//response.data kommer vara <any> från början. Vi måste beskriva vad det ska vara. Vi skapar interface IOmdbResponse som beskriver vad vi får (totalResult och Search) så vi har kontroll
axios
  .get<IOmdbResponse>("http://omdbapi.com?apikey=416ed51a&s=twilight")
  .then((response) => {
    console.log(response.data.Search);

    //Skickar Search till vår createHTML funktion
    createHTML(response.data.Search);

    //data har nu blivit OmdbResopnse och är inte längre <any. Vi kan använda egenskaperna totalResults och Search
  });

//Vår funktion tar emot response.Data.Search och vi döper den till movies
//Parametern har datatypen IMovie med en lista
const createHTML = (movies: IMovie[]) => {
  for (let i = 0; i < movies.length; i++) {
    console.log(movies[i].Title);

    let container: HTMLDivElement = document.createElement("div");
    let title: HTMLHeadingElement = document.createElement("h3");
    let img: HTMLImageElement = document.createElement("img");

    //Visar vilket imdbID vi klickade på
    container.addEventListener("click", () => {
      handleClick(movies[i]); //Om vi håller över movies[i] kan vi se att den har datatypen IMoivie
    });

    //Ordingen är viktig!
    title.innerHTML = movies[i].Title;
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    container.setAttribute("data-bs-toggle", "modal");
    container.setAttribute("data-bs-target", "#exampleModal");
    container.appendChild(title);
    container.appendChild(img);

    document.body.appendChild(container);
  }
};

//Måste ange vad movies[i] skall ta emot som, och att det är av datatypen IMovie
const handleClick = (movie: IMovie) => {
  console.log("Du klickade på", movie.imdbID);

  //Hämtar (axios.get) data om imdbID vi klickade på
  //i hämtar en film baserat på imdbID
  //Kan nu skapa ett till interface för att plocka ut egenskaper som vi vill visa från just denna filmen
  axios
    .get<IMovieExtended>("http://omdbapi.com?apikey=416ed51a&i=" + movie.imdbID)
    .then((response) => {
      console.log(response.data);

      //Vi hittar vår modal rubrik och sätter sedan innerHTML till titeln
      let modalTitle: HTMLHeadingElement = document.getElementById(
        "exampleModalLabel"
      ) as HTMLHeadingElement;
      modalTitle.innerHTML = movie.Title;

      //Hittar vår modal body
      let modalBody: HTMLDivElement = document.getElementById(
        "modal-body"
      ) as HTMLDivElement;

      //Tömmer innan vi skapar nya saker och lägger till
      //Annars kommer den visa gamla filmen vi klickat på också
      modalBody.innerHTML = " ";

      let img: HTMLImageElement = document.createElement("img");
      let plot: HTMLParagraphElement = document.createElement("p");
      let release: HTMLParagraphElement = document.createElement("p");
      let director: HTMLHeadingElement = document.createElement("h4");

      //Väljer hur vi vill visa vår data för filmen
      img.src = response.data.Poster;
      plot.innerHTML = response.data.Plot;
      release.innerHTML = response.data.Released;
      director.innerHTML = response.data.Director;

      //Publicerar i vår modalBody
      modalBody.appendChild(img);
      modalBody.appendChild(plot);
      modalBody.appendChild(release);
      modalBody.appendChild(director);
    });
};
