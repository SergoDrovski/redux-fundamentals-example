import {storage} from "@/features/storageApi/storage";
import {createSelector, createSlice} from "@reduxjs/toolkit"
import {selectFilters, StatusFilters} from "@/features/filters/filtersSlice";

export const todo = {
    text: "",
    completed: false
}
export const initialNote = {
    title: "",
    status: "active",
    todos: []
}

const initialNotes = {
    status: "idle",
    list: [],
    currentNote: null,
}

export const notesSlice = createSlice({
    name: "notes",
    initialState: initialNotes,
    reducers: {
        notesLoading: (state, action)=> {
            state.status = action.payload;
            return state;
        },
        notesLoaded: (state, action)=> {
            state.list = action.payload;
            state.status = "complete";
            return state;
        },
        noteAdded: (state, action)=> {
            // debugger
            state.list.push(action.payload);
            state.status = "complete";
            return state
        },
        noteUpdate: (state, action)=> {
            // debugger
            const {index, note} = action.payload
            state.list[index] = note;
            state.status = "complete";
            return state
        },
        noteDelete: (state, action)=> {
            // debugger
            state.list = state.list.filter((note) => note.id !== action.payload);
            state.status = "complete";
            return state
        },
        setCurrentNote: (state, action)=> {
            // debugger
            if(action.payload === null) {
                state.currentNote = null;
                return state;
            }
            const note = state.list.find(note => note.id === action.payload);
            if (note) {
                state.currentNote = {...note, id: action.payload};
            } else {
                state.currentNote = {...initialNote};
            }
            return state;
        },
        noteTitleAdded:(state, action) => {
            state.currentNote.title = action.payload
            return state;
        },
        todoAdded: (state, action)=> {
            const todos = state.currentNote.todos;
            todos.push({...todo, text: action.payload});
            state.currentNote.status = newStatusNote(todos);
            return state
        },
        todoToggled: (state, action)=> {
            const todos = state.currentNote.todos;
            todos[action.payload].completed = !todos[action.payload].completed
            state.currentNote.status = newStatusNote(todos);
            return state;
        },
        todoDeleted: (state, action)=> {
            const todos = state.currentNote.todos;
            todos.splice(action.payload, 1);
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
    notesLoading,
    noteAdded,
    noteUpdate,
    noteDelete,
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
        // debugger
        dispatch(notesLoading('loading'))
        let resp;
        const state = getState();
        const {list, currentNote} = state.notes;
        const note = list.find(note => note.id === id);
        if (note) {
            resp = await storage.updateOne(id, currentNote);
            if(resp) {
                let index = list.indexOf(note)
                dispatch(noteUpdate({index, note: resp}));
            }
        } else {
            resp = await storage.insertOne(currentNote);
            if(resp) dispatch(noteAdded(resp));
        }
    }
}

export const fetchNoteDelete = (id) => {
    return async (dispatch, getState) => {
        // debugger
        dispatch(notesLoading('loading'))
        let resp;
        try {
            const state = getState();
            const {list} = state.notes;
            const note = list.find(note => note.id === id);
            if (note) {
                resp = await storage.deleteOne(id);
                if (resp) throw new Error('delete not success')
                dispatch(noteDelete(note.id));
            }
        } catch (e) {
            alert(e)
        }
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
