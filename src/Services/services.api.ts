import axios from "axios";
import type {IMoviesArrayModel} from "../Models/IMoviesArrayModel.ts";
import type {IGenreModel} from "../Models/IGenreModel.ts";
import type {IMovieModel} from "../Models/IMovieModel.ts";

const axiosInstanse= axios.create({
    baseURL: import.meta.env.VITE_API_BASE_TMDB_URL,
    headers: {'content-type': 'application/json'}
});

const MoviesWithGenres = async (moviesPromise: Promise<{ data: IMoviesArrayModel }>): Promise<IMoviesArrayModel> => {
    const [moviesResponse, genres] = await Promise.all([
        moviesPromise,
        getGenres()
    ]);

    const moviesWithFullGenres = moviesResponse.data.results.map(movie => {
        const movieGenres = movie.genre_ids.map(genreId => {
            return genres.find(g => g.id === genreId) || null;
        }).filter((genre): genre is IGenreModel => genre !== null);
        return { ...movie, genres: movieGenres };
    });

    return { ...moviesResponse.data, results: moviesWithFullGenres };
};

export const getGenres  = async():Promise<IGenreModel[]>=>{
    const axiosResponseGenre= await axiosInstanse.get<{genres:IGenreModel[]}>(
        `/genre/movie/list?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA`);
    return axiosResponseGenre.data.genres;
}

export const getMoviesWithGenres = async (page:number=1): Promise<IMoviesArrayModel> => {
        const moviesPromise = axiosInstanse.get<IMoviesArrayModel>(
            `/movie/popular?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA&page=${page}`
        );
        return MoviesWithGenres(moviesPromise);
};

export const getMovieById = async (id: string): Promise<IMovieModel> => {
    const axiosResponse = await axiosInstanse.get<IMovieModel>(
        `/movie/${id}?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA`
    );
    return axiosResponse.data;
};

export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<IMoviesArrayModel> => {
    const moviesPromise = axiosInstanse.get<IMoviesArrayModel>(
        `/discover/movie?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA&with_genres=${genreId}&page=${page}`

    );
    return MoviesWithGenres(moviesPromise);
};

export const searchMovies = async (query: string, page: number = 1): Promise<IMoviesArrayModel> => {
    const moviesPromise = axiosInstanse.get<IMoviesArrayModel>(
        `/search/movie?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA&query=${query}&page=${page}`
    );
    return MoviesWithGenres(moviesPromise);
};
