import React, { useState } from 'react'

const Header = ({title, updateTitle}) => {
    const [text, setText] = useState(title);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.type === "blur") {
            setText(e.target.value);
            updateTitle(text.trim());
        }
    }
    const handleOnChange = (e) => {
        setText(e.target.value);
    }

  return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <input
              type="text"
              className="text-center text-3xl font-bold tracking-tight text-gray-900 w-full"
              placeholder="Click to edit Title"
              onKeyDown={handleKeyDown}
              onChange={handleOnChange}
              onBlur={handleKeyDown}
              value={text}
          />
      </div>
  )
}

export default Header
