import React from 'react'
import {availableColors, capitalize} from '../filters/colors'
import {useDispatch} from 'react-redux'
import { todoDeleted, todoToggled } from '../notes/notesSlice'

const TodoListItem = ({todo}) => {
    const dispatch = useDispatch()

    const {text, completed, color} = todo

    const handleCompletedChanged = (e) => {
        dispatch(todoToggled(todo.id))
    }

    // const handleColorChanged = (e) => {
    //     let id = todo.id
    //     let color = e.target.value
    //     dispatch(colorSelected({color, id}))
    // }

    const onDelete = (e) => {
        dispatch(todoDeleted(todo.id))
    }

    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c}>
            {capitalize(c)}
        </option>
    ))

    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-center gap-x-3">
                    <button
                        type="button"
                        className={(completed ? 'text-green-700 bg-green-50 ring-green-600/2' : 'bg-gray-50 text-gray-600 ring-gray-500/10') + ' inline-flex items-center rounded-full px-2 py-1 text-xs font-medium  ring-1 ring-inset'}
                        onClick={handleCompletedChanged}
                    >
                        <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <p className="break-all text-sm font-semibold leading-6 text-gray-900">{text}</p>
                </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <div className="relative flex-none">
                    <span
                        className="inline-flex items-center gap-x-0.5 rounded-md bg-red-100 px-1 py-1 text-xs font-medium text-red-700">
                      <button onClick={onDelete} type="button" className="group relative  h-5 w-5 rounded-sm hover:bg-red-600/20">
                        <span className="sr-only">Remove</span>
                        <svg viewBox="0 0 14 14" className="h-5 w-5 stroke-red-700/50 group-hover:stroke-red-700/75">
                          <path d="M4 4l6 6m0-6l-6 6"/>
                        </svg>
                        <span className="absolute -inset-1"></span>
                      </button>
                    </span>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
