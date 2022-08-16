import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodoIds } from './todosSlice.js'

import TodoListItem from './TodoListItem'

const TodoList = () => {
  const todoIds  = useSelector(selectTodoIds)
  const loading  = useSelector(state => state.todos.status)

  if(loading === 'loading') {
    return (
        <div className="todo-list">
          <div className="loader" />
        </div>
    )
  }
  // since `todos` is an array, we can loop over it
  const renderedListItems = todoIds.map(todoId => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList