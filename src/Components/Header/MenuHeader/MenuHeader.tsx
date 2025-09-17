import {type FC, useEffect, useState} from "react";
import { getGenres } from "../../../Services/services.api.ts";
import './MenuHeader.css';
import { Link } from "react-router";
import * as React from "react";

type MenuHeaderProps = {
    onGenreSelect: (genreName: string, genreId: number) => void;
    onShowPopular: () => void;
}
export const MenuHeader:FC<MenuHeaderProps> = ({ onGenreSelect,onShowPopular }) => {
    const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        getGenres().then((data) => {
            setGenres(data);
        });
    }, []);
    const handlePopularClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onShowPopular();
    };

    return (
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"} onClick={handlePopularClick}>
                            Movies
                        </Link>
                    </li>
                    <li className="dropdown">
                        <span>Genres</span>
                        <div className="dropdown-content">
                            {genres.map((genre) =>
                                <Link key={genre.id} to="#" onClick={() => onGenreSelect(genre.name, genre.id)}>
                                    {genre.name}
                                </Link>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
    );
};
