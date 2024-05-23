import React, { useState } from 'react'

const Header = ({title, updateTitle}) => {
    const [editable, setEditable] = useState(false);
    let content;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.type === "blur") {
            setEditable(!editable);
        }
    }

    if(!editable) {
        content = (<h1 onClick={() => setEditable(!editable)}
                       className="text-3xl font-bold tracking-tight text-gray-900"
        >{ title ? title : "Click to edit Title" }</h1>)

    } else {
        content = (<input
            type="text"
            className="text-center text-3xl font-bold tracking-tight text-gray-900 w-full"
            placeholder="Click to edit Title"
            onChange={(e) => updateTitle(e.target.value.trim())}
            onKeyDown={handleKeyDown}
            onBlur={handleKeyDown}
            value={title}
        />)
    }

  return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {content}
      </div>
  )
}

export default Header
