import Navigation from "@/features/nav/Navigation";
import React from "react";
import ListNotes from "@/features/notes/ListNotes";
import {selectList, selectStatusNotes} from "@/features/notes/notesSlice";
import {useSelector} from "react-redux";
import Loader from "@/features/common/Loader";

function Notes() {
    const loading  = useSelector(selectStatusNotes);
    const listNotes  = useSelector(selectList);

    return (
        <>
            <Navigation/>
            <main className="">
                <section className="container mx-auto xl:max-w-[900px]">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">List of Notes</h1>
                    </div>
                    {
                        (loading !== 'complete') ?
                        (<Loader/>) :
                        ((listNotes.length > 0) ? <ListNotes notes={listNotes}/> : (
                            <p> There is no notes right now!<br/> Click Create Note button to create one. </p>))
                    }
                </section>
            </main>
        </>
    )
}

export default Notes
