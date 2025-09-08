import {MovieListCards} from "../Components/MovieListCards/MovieListCards.tsx";
import {HeaderComponent} from "../Components/Header/HeaderComponent/HeaderComponent.tsx";
import {MoviesSection} from "../Components/MovieSection/MoviesSection.tsx";
import {useState} from "react";
import type {IMovieModel} from "../Models/IMovieModel.ts";
import {SearchDivComponent} from "../Components/SearchDivComponent/SearchDivComponent.tsx";

export const MoviesPage = () => {
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
            <HeaderComponent onGenreSelected={handleGenreSelect} onSearchResults={handleSearchResults}/>
            <MovieListCards/>
            <div id="movies-section">
                <MoviesSection selectedGenre={selectedGenre} genreId={genreId} />
            </div>
            <SearchDivComponent onResults={handleSearchResults} movies={movies} genreId={genreId}/>
        </>
    );
};
