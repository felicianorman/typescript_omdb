import { IMovie } from "./IMovie"

export interface IOmdbResponse {
  totalResults: string;
  Search: IMovie[];
}

//Vi måste skriva exakt vad svaret från OmdbApi är
//Vi beskriver vilken datatyp Search[] innehåller. Vi får skapa ett nytt interface som heter IMovie, som beskriver vilja objekt vill ha från objektet

//kan ha en export default per fil (importerar utan måsvingar). skriver vi utan default importerar vi med måsvingar. axios är importerat default, därför det inte är måsvingar när vi ipmorterar den.
