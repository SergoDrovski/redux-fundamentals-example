import {
  createBrowserRouter,
} from 'react-router-dom';
import CreateNote from "@/pages/CreateNote";
import Layout from "@/pages/Layout";
import Notes from "@/pages/Notes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Notes />
            },
            {
                path: '/note/:id',
                element: <CreateNote />
            },
            // {
            //     path: '/note/:id',
            //     element: <EditNote />
            // },
        ],
    },
]);
