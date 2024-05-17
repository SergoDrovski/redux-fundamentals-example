import React from 'react'
import {availableColors, capitalize} from '../filters/colors'
import {useDispatch, useSelector} from 'react-redux'
import {colorSelected, selectTodo, todoDeleted, todoToggled} from './todosSlice'

const TodoListItem = ({id}) => {

    const todo = useSelector(selectTodo(id))
    const dispatch = useDispatch()

    const {text, completed, color} = todo

    const handleCompletedChanged = (e) => {
        dispatch(todoToggled(todo.id))
    }

    const handleColorChanged = (e) => {
        let id = todo.id
        let color = e.target.value
        dispatch(colorSelected({color, id}))
    }

    const onDelete = (e) => {
        dispatch(todoDeleted(todo.id))
    }

    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c}>
            {capitalize(c)}
        </option>
    ))

    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={handleCompletedChanged}
                    />
                    <div className="todo-text">{text}</div>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                        value={color}
                        style={{color}}
                        onChange={handleColorChanged}
                    >
                        <option value=""></option>
                        {colorOptions}
                    </select>
                    <button className="destroy" onClick={onDelete}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                             className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 352 512">
                            <path fill="currentColor"
                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
