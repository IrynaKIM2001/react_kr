import {createBrowserRouter} from "react-router";
import {MoviesPage} from "../Pages/MoviesPage.tsx";
import {MovieDetailsPage} from "../Pages/MovieDetailsPage.tsx";

export const routes =createBrowserRouter([
    {path:'/',element:<MoviesPage/>},
    {path:'/movie/:id',element:<MovieDetailsPage/>}
])