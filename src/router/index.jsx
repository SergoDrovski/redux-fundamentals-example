import {
  createBrowserRouter,
    redirect
} from 'react-router-dom';
import CreateNote from "@/pages/CreateNote";
import Notes from "@/pages/Notes";
import Loader from "@/features/common/Loader";
// import EditNote from "@/pages/EditNote";

function logoutUser() {
    console.log('logoutUser')

}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Notes />
    },
    // {
    //     path: '/note/:id',
    //     element: <EditNote />
    // },
    {
        path: '/note',
        element: <CreateNote />
    },
]);
