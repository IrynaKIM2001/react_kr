import MovieSearch from "../Header/MovieSearch/MovieSearch.tsx";
import type {IMovieModel} from "../../Models/IMovieModel.ts";
import {MovieListCard} from "../MovieListCard/MovieListCard.tsx";
import {type FC, useEffect, useRef} from "react";
import './SearchDivComponent.css';

type SearchDivComponentProps = {
    onResults: (movies: IMovieModel[]) => void
    movies: IMovieModel[];
    genreId: number | null;
}
export const SearchDivComponent: FC<SearchDivComponentProps> = ({ onResults, movies, genreId }) => {
    const resultsRef = useRef<HTMLDivElement | null>(null);

    const scrollToResults = () => {
        if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    useEffect(() => {
            scrollToResults();
    }, [genreId, movies]);

    return (
        <section className='search-div'>
            <h1>Результат пошуку</h1>
            <MovieSearch onResults={onResults} />
            <div ref={resultsRef} className="movie-search-container">
                {movies.length > 0 ? (
                    <ul>
                        {movies.map((movie: IMovieModel) => (
                            <li key={movie.id}>
                                <MovieListCard movie={movie} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Фільмів не знайдено</p>
                )}
            </div>
        </section>
    );
};
