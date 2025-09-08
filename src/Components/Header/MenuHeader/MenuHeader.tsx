import {type FC, useEffect, useState} from "react";
import { getGenres, getMoviesWithGenres } from "../../../Services/services.api.ts";
import './MenuHeader.css';
import { Link } from "react-router";


type MenuHeaderProps = {
    onGenreSelect: (genreName: string, genreId: number) => void;
}
export const MenuHeader:FC<MenuHeaderProps> = ({ onGenreSelect }) => {
    const [movies, setMovies] = useState<{ id: number, title: string, genre_ids: number[], poster_path: string | null }[]>([]);
    const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        getGenres().then((data) => {
            setGenres(data);
        });
        getMoviesWithGenres().then((movies) => {
            setMovies(movies.results.map((movie) => ({
                id: movie.id,
                title: movie.title,
                genre_ids: movie.genre_ids,
                poster_path: movie.poster_path,
            })));
        });
    }, []);

    return (
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="dropdown">
                        <span>Movies</span>
                        <div className="dropdown-content">
                            {movies.map((movie) =>
                                <Link key={movie.id} to={`/movie/${movie.id}`}>
                                    {movie.title}
                                </Link>
                            )}
                        </div>
                    </li>
                    <li className="dropdown">
                        <span>Genres</span>
                        <div className="dropdown-content">
                            {genres.map((genre) =>
                                <Link key={genre.id} to="#" onClick={() => onGenreSelect(genre.name, genre.id)}>
                                    {genre.name}
                                </Link>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
    );
};
