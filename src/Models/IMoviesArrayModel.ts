import type {IMovieModel} from "./IMovieModel.ts";

export interface IMoviesArrayModel {
    page: number;
    results: IMovieModel[];
    total_pages: number;
    total_results: number;
}