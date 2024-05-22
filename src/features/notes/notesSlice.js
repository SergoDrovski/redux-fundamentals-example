import {client} from "@/api/client";
import {createSelector, createSlice} from "@reduxjs/toolkit"
import {selectFilters, StatusFilters} from "@/features/filters/filtersSlice";

export const todo = {
    text: "",
    color: "",
    completed: false
}
export const note = {
    title: "",
    status: "active",
    todos: []
}

const initialNotes = {
    status: "idle",
    list: [],
    currentNote: note,
    currentId: 0
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

        createNote: (state, action)=> {
            // state.currentNote = {...note, id: action.payload};
            state.currentId = action.payload;
            return state;
        },
        noteUpdate: (state)=> {
            // state.list.push({ id: state.currentId, ...state.currentNote })
            const note = state.list.find(note => note.id === state.currentId);
            if (note) {
                let index = state.list.indexOf(note)
                state.list[index] = { id: state.currentId, ...state.currentNote };
            } else {
                state.list.push({ id: state.currentId, ...state.currentNote });
            }
        },
        noteTitleAdded:(state, action) => {
            state.currentNote.title = action.payload
            return state;
        },

        todosLoaded: (state, action)=> {
            action.payload.forEach(todo => {
                state.todos[todo.id] = todo
            })
            state.status = "idle";
            return state;
        },
        todoAdded: (state, action)=> {
            const todos = state.currentNote.todos
            let newId = 0;
            if(todos.length > 0) {
                todos.forEach((todo => {if(todo.id > newId) newId = todo.id;}));
                newId++;
            }
            todos.push({...todo, id: newId, text: action.payload});
            return state
        },
        todoToggled: (state, action)=> {
            state.currentNote.todos.forEach((todo)=> {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed
                }
            })
            return state;
        },
        todoDeleted: (state, action)=> {
            state.currentNote.todos = state.currentNote.todos.filter((todo)=> {
                return todo.id !== action.payload
            })
            return state;
        },
        allCompleted: (state)=> {
            state.currentNote.todos = state.currentNote.todos.map(todo => {
                return {...todo, completed: true}
            })
            return state;
        },
        completedCleared: (state)=> {
            state.currentNote.todos = state.currentNote.todos.filter(todo => !todo.completed);
            return state;
        },
    }
})

export const {
    noteUpdate,
    noteTitleAdded,
    notesLoaded,
    createNote,
    allCompleted,
    completedCleared,
    todoAdded,
    todoDeleted,
    todoToggled,
} = notesSlice.actions

export default notesSlice.reducer

export const selectList = state => state.notes.list
export const selectStatusNotes = state => state.notes.status
export const selectCurrentNote = state => state.notes.currentNote

export const selectTodos = state => state.notes.currentNote.todos;
export const fetchNotes =  () => {
    return async (dispatch, getState) => {
        const resp = await client.get('/fakeApi/notes');
        dispatch(notesLoaded(resp));
        console.log(resp);
    }
}

export const selectFilteredTodos = createSelector(
    [selectTodos, selectFilters],
    (todos, filters) => {
        const {status, colors} = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0) return todos

        const completedStatus = status === StatusFilters.Completed
        let res =  todos.filter(todo => {
            const statusMatches = showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
        return res
    }
)
export const selectTodoIds = createSelector(
    [selectFilteredTodos],
    todos => todos.map(todo => todo.id)
)
