import {createSlice} from "@reduxjs/toolkit";
// import {noteSlice} from "@/features/todos/noteSlice";

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged: (state, action)=> {
      return {
        // Again, one less level of nesting to copy
        ...state,
        status: action.payload.status,
      }
    },
    colorFilterChanged: (state, action)=> {
      let { color, changeType } = action.payload.colorFilter
      const { colors } = state

      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) {
            // This color already is set as a filter. Don't change the state.
            return state
          }

          return {
            ...state,
            colors: state.colors.concat(color),
          }
        }
        case 'removed': {
          return {
            ...state,
            colors: state.colors.filter(
                (existingColor) => existingColor !== color
            ),
          }
        }
        default:
          return state
      }
    },
  }
})

export const {
  statusFilterChanged,
  colorFilterChanged,
} = filtersSlice.actions

export default filtersSlice.reducer

export const selectFilters = state => state.filters