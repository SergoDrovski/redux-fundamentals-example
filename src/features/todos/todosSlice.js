import { client } from "../../api/client";

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
