//Datahämtning
import axios from "axios";
import { IMovie } from "../newmodels/IMovie";
import { IOmdbResponse } from "../newmodels/IOmdbResponse";

export function searchMovies(searchText: string): Promise<IMovie[]> {
  return axios
   //Låter oss söka
    .get<IOmdbResponse>("http://omdbapi.com?apikey=416ed51a&s=" + searchText)
   
    .then((response) => {
      return response.data.Search;
    });
}

//Kan även skriva som async

//export async function ...
//let response = await axios.get<IOmdbResponse>("...")
//return response.data.Search
