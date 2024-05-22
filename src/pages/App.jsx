import {RouterProvider} from "react-router-dom";
import {router} from "@/router/index.jsx";
import DbConnect from "@/features/dbConnect/DbConnect";

function App() {
    return (
        <div className="App">
            <DbConnect>
                <RouterProvider router={router} />
            </DbConnect>
        </div>
    )
}

export default App
