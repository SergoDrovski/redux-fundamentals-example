import ListNotes from "@/features/notes/ListNotes";
import {useSelector} from "react-redux";
import Loader from "@/features/common/Loader";
import {useDispatch} from "react-redux";
import {setCurrentNote} from "@/features/notes/notesSlice";
import {useEffect} from "react";

function Notes() {
    const dispatch  = useDispatch();
    const { currentNote, list, status }  = useSelector(state => state.notes);

    useEffect(() => {
        if(currentNote) dispatch(setCurrentNote(null))
    }, [currentNote]);


    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">List of Notes</h1>
            </div>
            {
                (status !== 'complete') ?
                    (<Loader/>) :
                    ((list.length > 0) ? <ListNotes notes={list}/> : (
                        <p> There is no notes right now!<br/> Click Create Note button to create one. </p>))
            }
        </>
    )
}

export default Notes
