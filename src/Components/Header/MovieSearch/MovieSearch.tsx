import {type FC, useState} from "react";
import { searchMovies } from "../../../Services/services.api.ts";
import './MovieSearch.css';
import type {IMovieModel} from "../../../Models/IMovieModel.ts";

type SearchComponentProps = {
    onResults: (movies: IMovieModel[]) => void
}
const MovieSearch:FC<SearchComponentProps> = ({onResults}) => {
        const [query, setQuery] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const handleSearch = async () => {
            if (!query.trim()) return;
            setIsLoading(true);
            setError(null);
            try {
                const data = await searchMovies(query);
                onResults(data.results);
                setQuery("");
            } catch (err) {
                setError("Error fetching movies.");
                console.error(err)
            } finally {
                setIsLoading(false);
            }
        };

        return (
        <div className='search-inp-btn'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Пошук фільму..."
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Пошук..." : "Шукати"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default MovieSearch;
