import {client} from "@/api/client";
import { createSelector } from '@reduxjs/toolkit'
import {selectFilters, StatusFilters} from '../filters/filtersSlice'
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: 'idle',
    entities: {}
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        todosLoading: (state)=> {
            return state.status = 'loading';
        },
        todosLoaded: (state, action)=> {
            action.payload.todos.forEach(todo => {
                state.entities[todo.id] = todo
            })
            state.status = 'idle';
            return state;
        },
        todoAdded: (state, action)=> {
            const todo = action.payload;
            state.entities[todo.id] = todo
            return state
        },
        todoToggled: (state, action)=> {
            const todoToggl = state.entities[action.payload];
            state.entities[action.payload] = {
                ...todoToggl,
                completed: !todoToggl.completed
            };
            return state;
        },
        colorSelected: (state, action)=> {
            const todo = state.entities[action.payload.id];
            state.entities[todo.id] = {
                ...todo,
                color: action.payload.color
            };
            return state;
        },
        todoDeleted: (state, action)=> {
            delete state.entities[action.payload];
            return state;
        },
        allCompleted: (state)=> {
            const arrayTodos =  Object.values(state.entities);
            arrayTodos.forEach(todo => {
                state.entities[todo.id] = {...todo, completed: true}
            })
            return state;
        },
        completedCleared: (state)=> {
            const arrayTodos =  Object.values(state.entities);
            arrayTodos.forEach(todo => {
                if(todo.completed) delete state.entities[todo.id]
            })
            return state;
        },
    }
})

export const {
    todosLoading,
    todosLoaded,
    todoAdded,
    todoToggled,
    colorSelected,
    todoDeleted,
    allCompleted,
    completedCleared
} = todosSlice.actions

export default todosSlice.reducer

export const fetchTodos =  () => {
    return async (dispatch, getState) => {
        const resp = await client.get('/fakeApi/todos');
        dispatch(todosLoaded({type: 'todos/todosLoaded', todos: resp.todos}))
        console.log(resp.todos);
    }
}


export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = {text}
        await client.post('/fakeApi/todos', {todo: initialTodo}).then(resp => {
            dispatch(todoAdded(resp.todo))
        })
    }
}

export const selectTodos = state => state.todos.entities

export const selectTodo = (id)=> createSelector(
    [selectTodos],
    todos => {
        return Object.values(todos).find(todo => todo.id === id)
    }
)


export const selectFilteredTodos = createSelector(
    [selectTodos, selectFilters],
    (todos, filters) => {
        const todosArray = Object.values(todos);
        const {status, colors} = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0) return todosArray

        const completedStatus = status === StatusFilters.Completed
        let res =  todosArray.filter(todo => {
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
