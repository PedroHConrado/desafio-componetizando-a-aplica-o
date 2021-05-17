import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface SelectContentIndicator {
  selected: number;
}

export function Content(props: SelectContentIndicator) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selected}`).then(response => {
      setMovies(response.data);
    });
  }, [props.selected]);

  return (
    <div className="container">
      <Header selected={props.selected} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}