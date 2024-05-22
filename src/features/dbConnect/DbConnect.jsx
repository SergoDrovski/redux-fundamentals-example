import {useDispatch} from "react-redux";
import {fetchNotes} from "@/features/notes/notesSlice";
import {router} from "@/router";
import {RouterProvider} from "react-router-dom";
import {ConnectScheme} from "@/features/dbConnect/connect";

function DbConnect() {
    //1 проверить тип подключения
    const connect = new ConnectScheme();
    if(!connect.authData) {
        const type = window.prompt("укажите тип хранилища");
        const log = window.prompt("укажите log");
        const pass = window.prompt("укажите pass");
        connect.save({type, log, pass});
    }

    const dispatch  = useDispatch();
    dispatch(fetchNotes());

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default DbConnect
