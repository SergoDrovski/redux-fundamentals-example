import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { todoAdded } from '../notes/notesSlice'

const TodosHeader = () => {
  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)

  const dispatch  = useDispatch()

  const handleKeyDown = (e) => {
      const trimmedText = e.target.value.trim();
      if (e.key === 'Enter' && trimmedText) {
          dispatch(todoAdded(trimmedText))
          setText('')
      }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default TodosHeader
