import React from 'react'
import { useSelector } from 'react-redux'
import {selectFilteredTodos} from '../notes/notesSlice.js'

import TodoListItem from './TodoListItem'

const TodoList = () => {
  const todos  = useSelector(selectFilteredTodos);

  const renderedListItems = todos.map(todo => {
    return <TodoListItem key={todo.id} id={todo.id} todo={todo}/>
  })

  return <ul className="divide-y divide-gray-100 px-5">{renderedListItems}</ul>
}

export default TodoList