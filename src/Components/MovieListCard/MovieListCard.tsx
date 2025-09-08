
import type {FC} from "react";
import {Link} from "react-router";
import type {IMovieListItem} from "../../Models/IMovieListItem.ts";
import './MovieListCard.css';

interface MovieListCardProps {
    movie: IMovieListItem
}

export const MovieListCard:FC<MovieListCardProps> = ({movie} ) => {
    const genreNames = movie.genres?.map(genre => genre.name).join(", ") || "No genres available";

    return (
        <article className="movie-item">
            <Link to={`/movie/${movie.id}`}>
                <div className="image-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}/>
                    <div className="movie-info">
                        <h3 className='article-h3'>{movie.title}</h3>
                        <hr/>
                        <p>{movie.overview} </p>
                        <p>Жанри: {genreNames}</p>
                    </div>
                </div>
            </Link>
        </article>
);
};