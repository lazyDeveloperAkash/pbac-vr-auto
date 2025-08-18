import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

export default function makeCrudSlice(resource) {
  const fetchAll = createAsyncThunk(`${resource}/fetchAll`, async () => {
    try {
      const { data } = await api.get(`/${resource}`)
    return data.data || data[resource] || data
    } catch (error) {
      console.log(error);
    }
  })

  const createItem = createAsyncThunk(`${resource}/create`, async (payload) => {
    try {
      const { data } = await api.post(`/${resource}`, payload)
    return data.data || data[resource] || data
    } catch (error) {
      console.log(error);
    }
  })

  const updateItem = createAsyncThunk(`${resource}/update`, async ({ id, payload }) => {
    try {
      const { data } = await api.put(`/${resource}/${id}`, payload)
    return data.data || data
    } catch (error) {
      console.log(error);
    }
  })

  const deleteItem = createAsyncThunk(`${resource}/delete`, async (id) => {
    try {
      await api.delete(`/${resource}/${id}`)
    return id
    } catch (error) {
      console.log(error);
    }
  })

  const slice = createSlice({
    name: resource,
    initialState: { items: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.fulfilled, (s, a) => { s.items = a.payload; s.status = 'succeeded' })
        .addCase(createItem.fulfilled, (s, a) => { s.items.push(a.payload) })
        .addCase(updateItem.fulfilled, (s, a) => { s.items = s.items.map(it => it._id === (a.payload._id || a.payload.id) ? a.payload : it) })
        .addCase(deleteItem.fulfilled, (s, a) => { s.items = s.items.filter(it => it._id !== a.payload) })
    }
  })

  // attach thunks for easy import
  slice.fetchAll = fetchAll
  slice.createItem = createItem
  slice.updateItem = updateItem
  slice.deleteItem = deleteItem

  return slice
}
