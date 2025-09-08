import axios from "axios";
import type {IMoviesArrayModel} from "../Models/IMoviesArrayModel.ts";
import type {IGenreModel} from "../Models/IGenreModel.ts";
import type {IMovieModel} from "../Models/IMovieModel.ts";

const axiosInstanse= axios.create({
    baseURL: import.meta.env.VITE_API_BASE_TMDB_URL,
    headers: {'content-type': 'application/json'}
});

export const getGenres  = async():Promise<IGenreModel[]>=>{
    const axiosResponseGenre= await axiosInstanse.get<{genres:IGenreModel[]}>(
        `/genre/movie/list?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA`);
    return axiosResponseGenre.data.genres;
}

export const getMoviesPage = async (page: number = 1) => {
    const response = await axiosInstanse.get<IMoviesArrayModel>(
        `/movie/popular?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA&page=${page}`
    );
    return response.data;
};

export const getMoviesWithGenres = async (page:number=1): Promise<IMoviesArrayModel> => {
        const moviesData = await getMoviesPage(page);
        const genres = await getGenres();

        const moviesWithGenres = moviesData.results.map(movie => {
            const movieGenres = movie.genre_ids.map(genreId => {
                const genre = genres.find(g => g.id === genreId);
                return genre || null;
            }).filter((genre): genre is IGenreModel => genre !== null);

            return { ...movie, genres: movieGenres };
        });
        return { ...moviesData, results: moviesWithGenres };
};

export const getMovieById = async (id: string): Promise<IMovieModel> => {
    const axiosResponse = await axiosInstanse.get<IMovieModel>(
        `/movie/${id}?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA`
    );
    return axiosResponse.data;
};

export const getMoviesByGenre = async (genreId: number,page:number=1): Promise<IMoviesArrayModel> => {
    let allMovies: IMovieModel[] = [];
    let totalPages = 1;
    while (page <= totalPages) {
        const response = await axiosInstanse.get<IMoviesArrayModel>(
            `/movie/popular?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA&with_genres=${genreId}&page=${page}`
        );

        allMovies = [...allMovies, ...response.data.results];
        totalPages = response.data.total_pages;
        page++;
    }
    return {
        results: allMovies,
        total_pages: totalPages,
        total_results: allMovies.length,
        page: 1,
    };
};

export const searchMovies = async (query: string, page: number = 1): Promise<IMoviesArrayModel> => {
    const response = await axiosInstanse.get<IMoviesArrayModel>(
        `/search/movie?api_key=${import.meta.env.VITE_API_BASE_TMDB_KEY}&language=uk-UA&query=${query}&page=${page}`
    );
    const genres = await getGenres();

    const moviesWithGenres = response.data.results.map(movie => {
        const movieGenres = movie.genre_ids.map(genreId => {
            const genre = genres.find(g => g.id === genreId);
            return genre || null;
        }).filter((genre): genre is IGenreModel => genre !== null);

        return { ...movie, genres: movieGenres };
    });

    return { ...response.data, results: moviesWithGenres };
};
