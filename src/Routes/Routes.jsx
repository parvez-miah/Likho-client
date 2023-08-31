import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import NotesHome from "../NotesSection/NotesHome/NotesHome";
import AddNote from "../NotesSection/AddNote/AddNote";
import PrivateRoute from "./PrivateRoute";
import Login from "../Authentication/Login/Login";
import Secret from "../Pages/Secret/Secret";
import NoteView from "../NotesSection/NoteView/NoteView";
import EditNote from "../NotesSection/EditNote/EditNote";
import Register from "../Authentication/Register/Register";

const router = createBrowserRouter([

    
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><NotesHome></NotesHome></PrivateRoute>
            },
            {
                path:'/MyNotes',
                element: <PrivateRoute><NotesHome></NotesHome></PrivateRoute>
            },
            {
                path:'/AddaNote',
                element: <PrivateRoute><AddNote></AddNote></PrivateRoute>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path:'/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            },
            {
                path:'/note/:id',
                element: <PrivateRoute><NoteView></NoteView></PrivateRoute>
            },
            {
                path:'/edit/:id',
                element: <PrivateRoute><EditNote></EditNote></PrivateRoute>
            }
        ]
    },
]);

export default router;