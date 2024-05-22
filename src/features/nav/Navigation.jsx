import {NavLink, useMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {noteUpdate} from "@/features/notes/notesSlice";
function Navigation() {
    const match = useMatch("/note");
    const dispatch  = useDispatch();
    let handleBtn = null;
    let href = "/note";
    let text = "Create Note";
    let activeClass = "bg-indigo-500 hover:bg-indigo-400";

    if(Boolean(match)) {
        href = "/";
        text = "Save Note";
        activeClass = "bg-green-500 hover:bg-green-400";
        handleBtn = () => dispatch(noteUpdate());
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
                            <NavLink
                                  to={href}
                                  onClick={handleBtn}
                                  className={activeClass + ' relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm '}>
                                <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path
                                        d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                                </svg>
                                {text}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
