import React from 'react'
import { statusFilterChanged, StatusFilters} from '../filters/filtersSlice'
import {useDispatch, useSelector} from 'react-redux'
import {allCompleted, completedCleared } from '../notes/notesSlice'


const StatusFilter = () => {
    const dispatch = useDispatch()
    const currentStatus = useSelector(state => state.filters.status)

    const onStatusChange = (status) => dispatch(statusFilterChanged({type: 'filters/statusFilterChanged', status: status}))

    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value = StatusFilters[key]
        const handleClick = () => onStatusChange(value)
        const className = value === currentStatus ? 'selected' : ''

        return (
            <li key={value}>
                <button className={className} onClick={handleClick}>
                    {key}
                </button>
            </li>
        )
    })

    return (
        <div className="filters statusFilters">
            <h5 className="text-center">Filter by Status:</h5>
            <ul className="flex items-center gap-x-3">{renderedFilters}</ul>
        </div>
    )
}

const TodosFooter = () => {
    const dispatch = useDispatch()
    const handleAllCompletedChanged = (e) => dispatch(allCompleted())
    const handleCompletedCleared = (e) => dispatch(completedCleared())

    return (
        <footer className="footer justify-evenly gap-4">
            <StatusFilter/>
            <div className="actions">
                <h5>Actions:</h5>
                <button
                    type="button"
                    onClick={handleAllCompletedChanged}
                    className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    All Completed
                </button>
                <button
                    type="button"
                    onClick={handleCompletedCleared}
                    className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Clear Completed
                </button>
            </div>
        </footer>
    )
}

export default TodosFooter
