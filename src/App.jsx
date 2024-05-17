// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {useDispatch} from "react-redux"
import React from 'react'

import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Footer from './features/footer/Footer'

function App() {
    return (
        <div className="App">
            <nav>
                <section>
                    <ul className="nav nav-pills nav-fill flex-column flex-md-row">
                        <li className="nav-item">
                            <a href="#" className=""
                            >List Of Notes</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="">
                                Create Note</a>
                        </li>
                    </ul>
                </section>
            </nav>
            <main>
                <section className="medium-container">
                    <h2>Click to edit Title</h2>
                    <div className="todoapp">
                        <Header/>
                        <TodoList/>
                        <Footer/>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
