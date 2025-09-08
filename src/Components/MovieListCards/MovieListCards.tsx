import { useEffect, useState } from "react";
import {getMoviesWithGenres} from "../../Services/services.api.ts";
import { PaginationComponent } from "../PaginationComponent/PaginationComponent.tsx";
import './MovieListCards.css';
import type {IMoviesArrayModel} from "../../Models/IMoviesArrayModel.ts";
import {MovieListCard} from "../MovieListCard/MovieListCard.tsx";


export const MovieListCards = () => {
    const [movies, setMovies] = useState<IMoviesArrayModel | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const fetchMovies = async (page: number = 1) => {
        setLoading(true);
        const data = await getMoviesWithGenres(page);
        setMovies(data);
        setTotalPages(data.total_pages);
        setLoading(false);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);
        if (loading) return <div>Loading...</div>;
    return (
        <main>
            <section className="carousel-container">
                <div className="carousel">
                    {movies?.results.map((movie) => (
                        <MovieListCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
            {totalPages > 1 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </main>

    );
};
