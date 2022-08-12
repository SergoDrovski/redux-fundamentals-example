import { client } from "../../api/client";
import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = []

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todosLoaded': {
      return action.payload
    }
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        action.payload,
      ]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      return state.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo
        }

        return {
          ...todo,
          color: action.payload.color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    default:
      return state
  }
}

export async function fetchTodos(dispatch, getState) {
  await client.get('/fakeApi/todos').then(resp => {
    dispatch({ type: 'todos/todosLoaded', payload: resp.todos })
  })
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    await client.post('/fakeApi/todos', { todo: initialTodo}).then(resp => {
      dispatch({type: 'todos/todoAdded', payload: resp.todo})
    })
  }
}



export const selectFilteredTodos2 = createSelector(
    state => state.todos,
    state => state.filters,
    (todos, filters) => {
      let res = []
      if (filters.colors.length !== 0) {
        filters.colors.forEach((color)=>{
          res = todos.filter((todo)=>todo.color === color).concat(res)
        })
        if (filters.status === StatusFilters.All){
          return res
        }
      } else {
        res = todos
      }
      const completed = filters.status === StatusFilters.Completed
      return res.filter((todo) => todo.completed === completed)
    }
)


export const selectFilteredTodos = createSelector(
    state => state.todos,
    state => state.filters.status,
    (todos, status) => {
      if (status === StatusFilters.All){
        return todos
      }
      const completed = status === StatusFilters.Completed
      return todos.filter((todo, status) => todo.completed === completed)
    }
)

export const selectTodoIds = createSelector(
    selectFilteredTodos2,
    todos => todos.map(todo => todo.id)
)
