import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Navigate to="/" />,
            },
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/series",
                element: <Series />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },

        ]
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            }
        ]
    }


])

export default router