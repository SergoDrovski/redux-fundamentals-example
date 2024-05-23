import {useEffect} from 'react'
import Header from '../features/header/Header'
import TodoList from '../features/todos/TodoList'
import TodosFooter from '../features/todos/TodosFooter'
import {useDispatch, useSelector} from "react-redux";
import {noteTitleAdded, setCurrentNote} from "@/features/notes/notesSlice";
import {useMatch} from "react-router-dom";
import Loader from "@/features/common/Loader";
import TodosHeader from "@/features/todos/TodosHeader";


function CreateNote() {
    const dispatch  = useDispatch();
    const noteRout = useMatch("/note/:id");
    const { currentNote, status }  = useSelector(state => state.notes);

    const currentId = noteRout.params.id;
    useEffect(() => {
        if(status === "complete"){
            dispatch(setCurrentNote(Number(currentId)));
        }
    }, [status]);

    if(status === "idle"){
        return (<Loader/>);
    }

    const updateTitle = (title) => {
        dispatch(noteTitleAdded(String(title)));
    }

    return (
        <>
            <Header title={currentNote.title} updateTitle={updateTitle}/>
            <div className="todoapp rounded-lg">
                <TodosHeader/>
                <TodoList/>
                <TodosFooter/>
            </div>
        </>
    )
}

export default CreateNote
