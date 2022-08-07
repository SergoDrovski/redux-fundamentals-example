import React from 'react'
import {ReactComponent as TimesSolid} from './times-solid.svg'
import {availableColors, capitalize} from '../filters/colors'
import {useDispatch, useSelector} from 'react-redux'

const selectTodo = (state, id) => {
    return state.todos.find(todo => todo.id === id)
}

const TodoListItem = ({id}) => {

    const todo = useSelector(state => selectTodo(state, id))
    const dispatch = useDispatch()

    const {text, completed, color} = todo

    const handleCompletedChanged = (e) => {
        dispatch({type: 'todos/todoToggled', payload: todo.id})
        console.log(todo.id)
    }

    const handleColorChanged = (e) => {
        let id = todo.id
        let color = e.target.value
        dispatch({type: 'todos/colorSelected', payload: {color, id}})
        console.log({type: 'todos/colorSelected', payload: {color, id}})
    }

    const onDelete = (e) => {
        dispatch({type: 'todos/todoDeleted', payload: todo.id})
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
                        <TimesSolid/>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
