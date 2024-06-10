import {NavLink, useMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchNoteUpdate} from "@/features/notes/notesSlice";
import ControlBtn from "@/features/nav/ControlBtn";
function Navigation() {
    const noteRout = useMatch("/note/:id");
    const listRout = useMatch("/");

    const dispatch  = useDispatch();

    let btnData;
    if(Boolean(noteRout)) {
        const currentId = noteRout.params.id;
        btnData = {
            href: '/',
            handleNote: () => {dispatch(fetchNoteUpdate(currentId))},
            activeClass: "bg-green-500 hover:bg-green-400",
            text: "Save Note"
        }
    }
    if(Boolean(listRout)){
        btnData = {
            href: `/note/new`,
            handleNote: () => {},
            activeClass: "bg-indigo-500 hover:bg-indigo-400",
            text: "Create Note"
        }
    }

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between gap-16">
                    <div className="flex">
                        <div className="flex items-center space-x-4">
                            <NavLink
                                  to={`/`}
                                  className={({ isActive }) => {
                                      return (isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white') + ' rounded-md px-3 py-2 text-sm';
                                  }}
                             >List Of Notes</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <ControlBtn {...btnData}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
