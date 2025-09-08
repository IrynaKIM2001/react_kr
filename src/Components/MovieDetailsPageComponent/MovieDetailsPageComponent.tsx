import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getMovieById} from "../../Services/services.api.ts";
import type {IMovieModel} from "../../Models/IMovieModel.ts";
import './MovieDetailsPageComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRating from "./StarsRating/StarsRating.tsx";

export const MovieDetailsPageComponent = () => {
    const {id}= useParams();
    const [movies, setMovies] = useState<IMovieModel| undefined>(undefined);
    useEffect(() => {
        if(id) {
            getMovieById(id).then((movies) =>
                setMovies(movies))
        }}, [id]);
        if (!movies) {
            return <div>Loading...</div>;
        }
    const genreNames = movies.genres?.map(genre => genre.name).join(", ") || "No genres available";

        return (
        <main className='main-content-detailsPage'>
            <div className="image-container-detailsPage">
                <img
                src={`https://image.tmdb.org/t/p/w500${movies.backdrop_path}`}
                alt={movies.title}/>
                <div className="movie-info-detailsPage">
                    <h3 className='article-h3-detailsPage'>{movies.title}</h3>
                    <p>{movies.overview || "No description available"}</p>
                    <StarRating/>
                    <p>Оцінка глядачів - {movies.vote_average}</p>
                    <span className="badge bg-info text-dark">Жанри: {genreNames}</span>
                </div>
            </div>
        </main>
);
};