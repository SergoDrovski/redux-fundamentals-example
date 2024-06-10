import React, {useState} from "react";
import {Link} from "react-router-dom";
import {formatDate} from "@/utils/date";
import { Transition } from '@headlessui/react'
import {fetchNoteDelete} from "@/features/notes/notesSlice";
import {useDispatch} from "react-redux";


function ListNotes({ notes }) {
    const [idSubMenuActive, setId] = useState('');

    return (
        <ul className="divide-y divide-gray-100">
            {
                notes.map((note)=>{
                    return <Note key={note.id} note={note} isActive={idSubMenuActive === note.id} setActive={setId}/>
                })
            }

        </ul>
    )
}

function Note({note, isActive, setActive}) {
    const dispatch  = useDispatch();

    const { id, title, status, createdAt } = note;

    const date = formatDate(createdAt);
    const statusClass = status === 'active' ?
        'text-gray-600 bg-gray-50 ring-gray-500/10' :
        'text-green-700 bg-green-50 ring-green-600/20';

    const handleOnClickSubMenu = () => {
        setActive( (isActive ? '' : id) )
    }
    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
                <div className="min-w-0 w-full">
                    <div className="flex items-center gap-x-3">
                        <Link to={`/note/${id}`}><p className="text-sm font-semibold leading-6 text-gray-900">{title}</p></Link>
                        <p className={statusClass + " rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"}>{status}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                        <p className="whitespace-nowrap">Created at <time>{date}</time></p>
                    </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                    <Link to={`/note/${id}`}
                       className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">View</Link>
                    <div className="relative flex-none">
                        <button
                            onClick={handleOnClickSubMenu}
                            onBlur={handleOnClickSubMenu}
                            className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
                                 aria-hidden="true">
                                <path
                                    d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"/>
                            </svg>
                        </button>
                        <Transition
                            show={isActive}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <div
                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="options-menu-1-button">
                                <button
                                   onClick={() => dispatch(fetchNoteDelete(id))}
                                   className="hover:bg-gray-50 block px-3 py-1 text-sm leading-6 text-red-700">Delete</button>
                            </div>
                        </Transition>

                    </div>
                </div>
        </li>
    )
}


export default ListNotes
