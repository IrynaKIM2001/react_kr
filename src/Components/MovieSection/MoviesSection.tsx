import {type FC, useEffect, useState} from "react";
import { getMoviesWithGenres } from "../../Services/services.api.ts";
import {MovieListCard} from "../MovieListCard/MovieListCard.tsx";
import type {IMovieListItem} from "../../Models/IMovieListItem.ts";
import './MoviesSection.css';

interface MoviesSectionProps {
    selectedGenre: string | null;
    genreId: number | null;
}

export const MoviesSection:FC<MoviesSectionProps> = ({ selectedGenre, genreId }) => {
    const [movies, setMovies] = useState<IMovieListItem[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<IMovieListItem[]>([]);

    useEffect(() => {
        getMoviesWithGenres().then((movies) => {
            setMovies(movies.results.map((movie) => ({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                genre_ids: movie.genre_ids,
                genres: movie.genres,
                overview: movie.overview,
            })));
        });
    }, []);

    useEffect(() => {
        if (genreId !== null) {
            const filtered = movies.filter((movie) => movie.genre_ids.includes(genreId));
            setFilteredMovies(filtered);
        }
    }, [genreId, movies]);

    return (
        <section className="filtered-movies-section">
            <div className="container-genres">
                {selectedGenre && <h2>Фільми у вибраному жанрі: {selectedGenre}</h2>}
                <div className="movies-container">
                    {filteredMovies.map((movie) => (
                                <MovieListCard key={movie.id} movie={movie}/>
                             )
                    )}
                </div>
            </div>
        </section>
    );
};
