import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import './style/index.css'
import App from './pages/App'
// import './api/server'
import store from './store'
// import {fetchTodos} from "@/features/todos/todosSlice";
// store.dispatch(fetchTodos());

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container)
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
