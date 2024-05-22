// import {client} from "@/api/client";
// import { createSelector } from '@reduxjs/toolkit'
// import {selectFilters, StatusFilters} from '../filters/filtersSlice'
// import { createSlice } from "@reduxjs/toolkit"
//
// export const initialNote = {
//     id: 1,
//     title: "",
//     status: "active",
//     todos: {}
// }
//
// export const noteSlice = createSlice({
//     name: "note",
//     initialState: null,
//     reducers: {
//         createNote: (state, action)=> {
//             state = {...initialNote, id: action.payload};
//             return state;
//         },
//         todosLoaded: (state, action)=> {
//             action.payload.forEach(todo => {
//                 state.todos[todo.id] = todo
//             })
//             state.status = "idle";
//             return state;
//         },
//         todoAdded: (state, action)=> {
//             const todo = action.payload;
//             state.todos[todo.id] = todo
//             return state
//         },
//         todoToggled: (state, action)=> {
//             const todoToggl = state.todos[action.payload];
//             state.todos[action.payload] = {
//                 ...todoToggl,
//                 completed: !todoToggl.completed
//             };
//             return state;
//         },
//         colorSelected: (state, action)=> {
//             const todo = state.todos[action.payload.id];
//             state.todos[todo.id] = {
//                 ...todo,
//                 color: action.payload.color
//             };
//             return state;
//         },
//         todoDeleted: (state, action)=> {
//             delete state.todos[action.payload];
//             return state;
//         },
//         allCompleted: (state)=> {
//             const arrayTodos =  Object.values(state.todos);
//             arrayTodos.forEach(todo => {
//                 state.todos[todo.id] = {...todo, completed: true}
//             })
//             return state;
//         },
//         completedCleared: (state)=> {
//             const arrayTodos =  Object.values(state.todos);
//             arrayTodos.forEach(todo => {
//                 if(todo.completed) delete state.todos[todo.id]
//             })
//             return state;
//         },
//     }
// })
//
// export const {
//     createNote,
//     todosLoaded,
//     todoAdded,
//     todoToggled,
//     colorSelected,
//     todoDeleted,
//     allCompleted,
//     completedCleared
// } = noteSlice.actions
//
// export default noteSlice.reducer
//
// export const fetchTodos =  () => {
//     return async (dispatch, getState) => {
//         const resp = await client.get('/fakeApi/todos');
//         dispatch(todosLoaded({type: 'todos/todosLoaded', todos: resp.todos}))
//         console.log(resp.todos);
//     }
// }
//
//
// export function saveNewTodo(text) {
//     return async function saveNewTodoThunk(dispatch, getState) {
//         const initialTodo = {text}
//         await client.post('/fakeApi/todos', {todo: initialTodo}).then(resp => {
//             dispatch(todoAdded(resp.todo))
//         })
//     }
// }
//
// // export const selectCurrentNote = state => state.note
//
// export const selectTodos = state => state.note.todos
//
// export const selectTodo = (id)=> createSelector(
//     [selectTodos],
//     todos => {
//         return Object.values(todos).find(todo => todo.id === id)
//     }
// )
//
//
// export const selectFilteredTodos = createSelector(
//     [selectTodos, selectFilters],
//     (todos, filters) => {
//         const todosArray = Object.values(todos);
//         const {status, colors} = filters
//         const showAllCompletions = status === StatusFilters.All
//         if (showAllCompletions && colors.length === 0) return todosArray
//
//         const completedStatus = status === StatusFilters.Completed
//         let res =  todosArray.filter(todo => {
//             const statusMatches = showAllCompletions || todo.completed === completedStatus
//             const colorMatches = colors.length === 0 || colors.includes(todo.color)
//             return statusMatches && colorMatches
//         })
//         return res
//     }
// )
// export const selectTodoIds = createSelector(
//     [selectFilteredTodos],
//     todos => todos.map(todo => todo.id)
// )
