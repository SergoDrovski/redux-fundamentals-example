import {client} from "../../api/client";
import {createSelector} from 'reselect'
import {StatusFilters} from '../filters/filtersSlice'

const initialState = {
    status: 'idle',
    entities: null
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todosLoading': {
            return {
                ...state,
                status: 'loading'
            }
        }
        case 'todos/todosLoaded': {
            const todos = {}
            action.payload.forEach(todo => {
                todos[todo.id] = todo
            })
            return {
                ...state,
                status: 'idle',
                entities: todos,
            }
        }
        case 'todos/todoAdded': {
            // Can return just the new todos array - no extra object around it
            const todo = action.payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todo.id]: todo
                }
            }
        }
        case 'todos/todoToggled': {
            const todoToggl = state.entities[action.payload]
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.payload]: {
                        ...todoToggl,
                        completed: !todoToggl.completed
                    }
                }
            }
        }
        case 'todos/colorSelected': {
            const todo = state.entities[action.payload]
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.payload.id]: {
                        ...todo,
                        color: action.payload.color
                    }
                }
            }
        }
        case 'todos/todoDeleted': {
            return {
                ...state,
                entities: state.entities.filter((todo) => todo.id !== action.payload)
            }
        }
        case 'todos/allCompleted': {
            return {
                ...state,
                entities: state.entities.map((todo) => {
                    return {...todo, completed: true}
                })
            }
        }
        case 'todos/completedCleared': {
            return {
                ...state,
                entities: state.entities.filter((todo) => !todo.completed)
            }
        }
        default:
            return state
    }
}

export async function fetchTodos(dispatch, getState) {
    // dispatch({ type: 'todos/todosLoading' })
    await client.get('/fakeApi/todos').then(resp => {
        console.log(resp.todos)
        dispatch({type: 'todos/todosLoaded', payload: resp.todos})
    })
}

export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = {text}
        await client.post('/fakeApi/todos', {todo: initialTodo}).then(resp => {
            dispatch({type: 'todos/todoAdded', payload: resp.todo})
        })
    }
}

export const selectTodos = state => state.todos.entities

export const selectFilteredTodos = createSelector(
    selectTodos,
    state => state.filters,
    (todos, filters) => {
        const {status, colors} = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0) return todos

        const completedStatus = status === StatusFilters.Completed
        return todos.filter(todo => {
            const statusMatches = showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    }
)
export const selectTodoIds = createSelector(
    selectFilteredTodos,
    todos => todos.map(todo => todo.id)
)
