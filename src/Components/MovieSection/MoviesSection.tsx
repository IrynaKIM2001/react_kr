import {type FC, useEffect, useState} from "react";
import {getMoviesByGenre} from "../../Services/services.api.ts";
import {MovieListCard} from "../MovieListCard/MovieListCard.tsx";
import type {IMovieListItem} from "../../Models/IMovieListItem.ts";
import './MoviesSection.css';
import {useSearchParams} from "react-router";
import {PaginationComponent} from "../PaginationComponent/PaginationComponent.tsx";

interface MoviesSectionProps {
    selectedGenre: string | null;
    genreId: number | null;
}

export const MoviesSection:FC<MoviesSectionProps> = ({ selectedGenre, genreId }) => {
    const [movies, setMovies] = useState<IMovieListItem[]>([]);
    const [loading, setLoading]=useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        if (genreId !== null) {
            setLoading(true);
            getMoviesByGenre(genreId, currentPage)
                .then(data => {
                    setMovies(data.results);
                    setTotalPages(Math.min(data.total_pages, 500));
                })
                .finally(() => setLoading(false));
        } else {
            setMovies([]);
        }
    }, [genreId, currentPage]);
    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        setSearchParams(newSearchParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <section className="filtered-movies-section">
            <div className="container-genres">
                {selectedGenre && <h2>Фільми у вибраному жанрі: {selectedGenre}</h2>}
                <div className="movies-container">
                    {movies.map((movie) => (
                        <MovieListCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {totalPages > 1 && !loading && (
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};
