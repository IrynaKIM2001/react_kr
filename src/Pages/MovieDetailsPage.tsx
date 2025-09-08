import {HeaderComponent} from "../Components/Header/HeaderComponent/HeaderComponent.tsx";
import {MovieDetailsPageComponent} from "../Components/MovieDetailsPageComponent/MovieDetailsPageComponent.tsx";
import {useState} from "react";
import type {IMovieModel} from "../Models/IMovieModel.ts";
import {MoviesSection} from "../Components/MovieSection/MoviesSection.tsx";
import {SearchDivComponent} from "../Components/SearchDivComponent/SearchDivComponent.tsx";

export const MovieDetailsPage = () => {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [genreId, setGenreId] = useState<number | null>(null);
    const [movies, setMovies] = useState<IMovieModel[]>([]);

    const handleGenreSelect = (genreName: string, genreId: number) => {
        setSelectedGenre(genreName);
        setGenreId(genreId);
        const element = document.getElementById("movies-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const handleSearchResults = (movies: IMovieModel[]) => {
        setMovies(movies);
    };
    return (
        <>
            <HeaderComponent onGenreSelected={handleGenreSelect} onSearchResults={handleSearchResults} />
            <MovieDetailsPageComponent/>
            <div id="movies-section">
                <MoviesSection selectedGenre={selectedGenre} genreId={genreId}/>
            </div>
            <SearchDivComponent onResults={handleSearchResults} movies={movies} genreId={genreId}/>
        </>
    );
};