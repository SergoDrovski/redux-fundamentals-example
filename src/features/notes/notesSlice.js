import {storage} from "@/features/storageApi/storage";
import {createSelector, createSlice} from "@reduxjs/toolkit"
import {selectFilters, StatusFilters} from "@/features/filters/filtersSlice";

export const todo = {
    // id: "1",
    text: "",
    completed: false
}
export const initialNote = {
    // id: "1",
    createdAt: "",
    title: null,
    status: "active",
    todos: []
}

const initialNotes = {
    status: "idle",
    list: [],
    currentNote: initialNote,
}

export const notesSlice = createSlice({
    name: "notes",
    initialState: initialNotes,
    reducers: {
        // notesLoading: (state, action)=> {
        //     state.status = action.payload;
        //     return state;
        // },
        notesLoaded: (state, action)=> {
            state.list = action.payload;
            state.status = "complete";
            return state;
        },
        setCurrentNote: (state, action)=> {
            const note = state.list.find(note => note.id === action.payload);
            if (note) {
                state.currentNote = {...note, id: action.payload};
            } else {
                state.currentNote = {...initialNote};
            }
            return state;
        },
        // noteUpdate: (state)=> {
        //     const note = state.list.find(note => note.id === state.currentId);
        //     if (note) {
        //         let index = state.list.indexOf(note)
        //         state.list[index] = { id: state.currentId, ...state.currentNote };
        //     } else {
        //         state.list.push({ id: state.currentId, ...state.currentNote });
        //     }
        // },
        noteTitleAdded:(state, action) => {
            state.currentNote.title = action.payload
            return state;
        },
        // todosLoaded: (state, action)=> {
        //     action.payload.forEach(todo => {
        //         state.todos[todo.id] = todo
        //     })
        //     state.status = "idle";
        //     return state;
        // },
        todoAdded: (state, action)=> {
            const todos = state.currentNote.todos;
            let newId = 0;
            if(todos.length > 0) {
                todos.forEach((todo => {if(todo.id > newId) newId = todo.id;}));
                newId++;
            }
            todos.push({...todo, id: newId, text: action.payload});
            state.currentNote.status = newStatusNote(todos);
            return state
        },
        todoToggled: (state, action)=> {
            const todos = state.currentNote.todos;
            todos.forEach((todo)=> {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
            })
            state.currentNote.status = newStatusNote(todos);
            return state;
        },
        todoDeleted: (state, action)=> {
            const todos = state.currentNote.todos;
            state.currentNote.todos = todos.filter((todo)=> {
                return todo.id !== action.payload
            })
            state.currentNote.status = newStatusNote(state.currentNote.todos);
            return state;
        },
        allCompleted: (state)=> {
            const todos = state.currentNote.todos;
            state.currentNote.todos = todos.map(todo => {
                return {...todo, completed: true}
            })
            state.currentNote.status = newStatusNote(state.currentNote.todos);
            return state;
        },
        completedCleared: (state)=> {
            state.currentNote.todos = state.currentNote.todos.filter(todo => !todo.completed);
            state.currentNote.status = newStatusNote(state.currentNote.todos);
            return state;
        },
    }
})

export const {
    // noteUpdate,
    noteTitleAdded,
    notesLoaded,
    setCurrentNote,
    allCompleted,
    completedCleared,
    todoAdded,
    todoDeleted,
    todoToggled,
} = notesSlice.actions

export default notesSlice.reducer

export const selectList = state => state.notes.list
export const selectStatusNotes = state => state.notes.status

// export const selectLastIndexList = (state) => {
//     const list =  state.notes.list;
//     return list.length > 0 ? list[list.length-1].id : null;
// }

export const selectTodos = state => state.notes.currentNote.todos;

export const newStatusNote =  (todos) => {
    return todos.filter(todo => !todo.completed).length > 0 ? "active" : "completed";
}

export const fetchNotes =  () => {
    return async (dispatch, getState) => {
        const resp = await storage.find();
        dispatch(notesLoaded(resp));
    }
}

export const fetchNoteUpdate = (id) => {
    return async (dispatch, getState) => {
        let resp;
        const state = getState();
        const {currentNote} = state.notes;
        const note = state.notes.list.find(note => note.id === id);
        if (note) {
            resp = await storage.updateOne(id, currentNote);
        } else {
            resp = await storage.insertOne(currentNote);
        }
        if(resp) dispatch(notesLoaded(resp));
    }
}

export const selectFilteredTodos = createSelector(
    [selectTodos, selectFilters],
    (todos, filters) => {
        const {status} = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions) return todos

        const completedStatus = status === StatusFilters.Completed
        return todos.filter(todo => {
            return showAllCompletions || todo.completed === completedStatus
        })
    }
)
