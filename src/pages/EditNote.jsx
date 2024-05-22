import React from 'react'
import Header from '../features/header/Header'
import TodoList from '../features/todos/TodoList'
import Footer from '../features/footer/Footer'
import Navigation from "@/features/nav/Navigation";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectNoteId, selectNotes} from "@/features/notes/notesSlice";
import {initialNote, selectCurrentNote, todoAdded} from "@/features/todos/noteSlice";
import Loader from "@/features/common/Loader";


function CreateNote() {
    const dispatch  = useDispatch();
    const params = useParams();
    let currentNote = useSelector(selectCurrentNote);
    const {list} = useSelector(state => state.notes);
    const NoteId = params.id ? Number(params.id) : params.id;

    //  /note/2

    // if(!NoteId && !currentNote) {
    //     const lastId = list.length > 0 ? list[list.length-1].id : 1;
    //     dispatch(todoAdded({...initialNote, id: lastId}));
    // }
    //
    // if(NoteId && !currentNote) {
    //     currentNote  = useSelector(selectNoteId(NoteId));
    //     if(currentNote) dispatch(todoAdded(currentNote));
    // }

    return (
        <>
            <Navigation/>
            <main>
                {/*<section className="md:container md:mx-auto">*/}
                {/*    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">*/}
                {/*        <input*/}
                {/*            className="text-center text-3xl font-bold tracking-tight text-gray-900 w-full"*/}
                {/*            placeholder={ currentNote.title ?? "Click to edit Title" }*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="todoapp rounded-lg">*/}
                {/*        <Header/>*/}
                {/*        <TodoList/>*/}
                {/*        <Footer/>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>
        </>
    )
}

export default CreateNote
