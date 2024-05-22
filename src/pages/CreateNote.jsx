import React, {useEffect, useState} from 'react'
import Header from '../features/header/Header'
import TodoList from '../features/todos/TodoList'
import Footer from '../features/footer/Footer'
import Navigation from "@/features/nav/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {createNote, noteTitleAdded} from "@/features/notes/notesSlice";


function CreateNote() {
    debugger
    const dispatch  = useDispatch();
    const {status, list, currentNote, currentId}  = useSelector(state => state.notes);

    const [text, setText] = useState(currentNote.title);

    useEffect(() => {
        if(status === 'complete') {
            const newId = list.length > 0 ? list[list.length-1].id + 1 : 0;
            if(currentId !== newId) dispatch(createNote(newId));
        }
    }, [status, currentId]);

    const handleChange = (e) => setText(e.target.value)

    const handleKeyDown = (e) => {

        const trimmedText = e.target.value.trim()
        if (trimmedText && (e.key === 'Enter' || e.type === "blur")) {
            dispatch(noteTitleAdded(trimmedText));
        }
    }

    return (
        <>
            <Navigation/>
            <main>
                <section className="md:container md:mx-auto">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <input
                            className="text-center text-3xl font-bold tracking-tight text-gray-900 w-full"
                            placeholder="Click to edit Title"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleKeyDown}
                            value={text}
                        />
                    </div>
                    <div className="todoapp rounded-lg">
                        <Header/>
                        <TodoList todos={currentNote.todos}/>
                        <Footer/>
                    </div>
                </section>
            </main>
        </>
    )
}

export default CreateNote
