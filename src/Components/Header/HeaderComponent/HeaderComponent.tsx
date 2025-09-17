import {MenuHeader} from "../MenuHeader/MenuHeader.tsx";
import './HeaderComponent.css';
import MovieSearch from "../MovieSearch/MovieSearch.tsx";
import type {IMovieModel} from "../../../Models/IMovieModel.ts";
import type {FC} from "react";

interface HeaderProps {
    onGenreSelected: (genreName: string, genreId: number) => void;
    onSearchResults: (movies: IMovieModel[]) => void;
    onShowPopular: () => void;
}
export const HeaderComponent:FC<HeaderProps> = ({ onGenreSelected, onSearchResults,onShowPopular }) => {

    return (
        <header>
            <div className='header'>
                <div className='header-logo'>
                    <h3>&#9818; MovieQueen</h3>
                </div>
                    <MenuHeader onGenreSelect={onGenreSelected} onShowPopular={onShowPopular}/>
                    <MovieSearch onResults={onSearchResults}/>
                <div className='userIconDiv'>
                    <p>Queen</p>
                    <img className='userIcon' src="/UserIcon.jpg" alt="User Icon"/>
                </div>
            </div>
        </header>
    );
};