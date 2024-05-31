import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "@/features/nav/Navigation";
import {useDispatch} from "react-redux";
import {storage} from "@/features/storageApi/storage";
import {fetchNotes} from "@/features/notes/notesSlice";

function Layout() {
    const dispatch  = useDispatch();
    console.log('Layout');
    if(storage.connectData) {
        dispatch(fetchNotes());
    }

    return (
        <>
            <Navigation/>
            <main className="">
                <section className="container mx-auto xl:max-w-[900px]">
                    <Outlet />
                </section>
            </main>
        </>
    )
}

export default Layout
