import {createSlice} from "@reduxjs/toolkit";

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
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
  }
})

export const {
  statusFilterChanged,
} = filtersSlice.actions

export default filtersSlice.reducer

export const selectFilters = state => state.filters