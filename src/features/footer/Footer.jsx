import React from 'react'
import {availableColors, capitalize} from '../filters/colors'
import {colorFilterChanged, statusFilterChanged, StatusFilters} from '../filters/filtersSlice'
import {useDispatch, useSelector} from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import {allCompleted, completedCleared, selectTodos} from '../todos/todosSlice'


const RemainingTodos = ({count}) => {
    const suffix = count === 1 ? '' : 's'

    return (
        <div className="todo-count">
            <h5>Remaining Todos</h5>
            <strong>{count}</strong> item{suffix} left
        </div>
    )
}

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
            <h5>Filter by Status</h5>
            <ul>{renderedFilters}</ul>
        </div>
    )
}

const ColorFilters = () => {
    const dispatch = useDispatch()
    const activeFilterColors = useSelector(state => state.filters.colors)

    const onColorChange = (color, changeType) => dispatch(colorFilterChanged({type: 'filters/colorFilterChanged', colorFilter: {color, changeType}}))

    const renderedColors = availableColors.map((color) => {
        const checked = activeFilterColors.includes(color)

        const handleChange = () => {
            const changeType = checked ? 'removed' : 'added'
            onColorChange(color, changeType)
        }

        return (
            <label key={color}>
                <input
                    type="checkbox"
                    name={color}
                    checked={checked}
                    onChange={handleChange}
                />
                <span
                    className="color-block"
                    style={{
                        backgroundColor: color,
                    }}
                ></span>
                {capitalize(color)}
            </label>
        )
    })

    return (
        <div className="filters colorFilters">
            <h5>Filter by Color</h5>
            <form className="colorSelection">{renderedColors}</form>
        </div>
    )
}

const selectTodoRemaining = createSelector(
    selectTodos,
    todos => Object.values(todos).filter(todo => !todo.completed)
)

const Footer = () => {
    const dispatch = useDispatch()
    const todosRemaining = useSelector(selectTodoRemaining)
    const currRemaining = todosRemaining.length

    const handleAllCompletedChanged = (e) => dispatch(allCompleted({type: 'todos/allCompleted'}))
    const handleCompletedCleared = (e) => dispatch(completedCleared({type: 'todos/completedCleared'}))

    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button className="button" onClick={handleAllCompletedChanged}>Mark All Completed</button>
                <button className="button" onClick={handleCompletedCleared}>Clear Completed</button>
            </div>

            <RemainingTodos count={currRemaining}/>
            <StatusFilter />
            <ColorFilters />
        </footer>
    )
}

export default Footer
