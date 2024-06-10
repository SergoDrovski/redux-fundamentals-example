import {
  createBrowserRouter,
    redirect
} from 'react-router-dom';
import CreateNote from "@/pages/CreateNote";
import Layout from "@/pages/Layout";
import Notes from "@/pages/Notes";
import ConnectStorage from "@/features/storageApi/ConnectStorage";
import {storage} from "@/features/storageApi/storage";

const checkConnect = async () => {
    // debugger
    if (!storage.connectStatus) {
        try {
            await storage.connect();
            if (storage.connectStatus) return null;
            return redirect("/connect");
        } catch (err) {
            return redirect("/connect");
        }
    }
    return null;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                loader: checkConnect,
                element: <Notes />
            },
            {
                path: '/note/:id',
                loader: checkConnect,
                element: <CreateNote />
            },
        ],
    },
    {
        path: '/connect',
        element: <ConnectStorage />
    },
]);
