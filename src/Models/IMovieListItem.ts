import type {IGenreModel} from "./IGenreModel.ts";

export interface IMovieListItem {
    id: number;
    title: string;
    poster_path: string | null;
    genre_ids: number[];
    genres: IGenreModel[];
    overview: string;
}