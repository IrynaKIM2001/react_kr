import {MovieListCards} from "../Components/MovieListCards/MovieListCards.tsx";
import {HeaderComponent} from "../Components/Header/HeaderComponent/HeaderComponent.tsx";
import {MoviesSection} from "../Components/MovieSection/MoviesSection.tsx";
import {useEffect, useState} from "react";
import type {IMovieModel} from "../Models/IMovieModel.ts";
import {SearchDivComponent} from "../Components/SearchDivComponent/SearchDivComponent.tsx";

export const MoviesPage = () => {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [genreId, setGenreId] = useState<number | null>(null);
    const [movies, setMovies] = useState<IMovieModel[]>([]);

    const handleGenreSelect = (genreName: string, genreId: number) => {
        setSelectedGenre(genreName);
        setGenreId(genreId);

    };
    useEffect(() => {
        if (genreId !== null) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [genreId]);
    const handleSearchResults = (movies: IMovieModel[]) => {
        setMovies(movies);
    };
    const handleShowPopular = () => {
        setSelectedGenre(null);
        setGenreId(null);
    };

    return (
        <>
            <HeaderComponent
                onGenreSelected={handleGenreSelect}
                onShowPopular={handleShowPopular}
                onSearchResults={handleSearchResults}/>
            {genreId ? (
                <MoviesSection
                    selectedGenre={selectedGenre} genreId={genreId}
                />
            ) : (
                <MovieListCards />
            )}
            <SearchDivComponent onResults={handleSearchResults} movies={movies} genreId={genreId}/>
        </>
    );
};
