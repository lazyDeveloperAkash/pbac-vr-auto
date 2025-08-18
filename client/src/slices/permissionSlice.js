import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchUserPermissions = createAsyncThunk(
  "permission/fetch",
  async (userId) => {
    try {
      const { data } = await api.get(`/permissions/${userId}`);
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const copyPermissions = createAsyncThunk(
  "permission/copy",
  async (payload) => {
    const { data } = await api.post("/permissions/copy", payload);
    return data;
  }
);

export const setPermission = createAsyncThunk(
  "permission/set",
  async (payload) => {
    const { data } = await api.post("/permissions", payload);
    return data.data;
  }
);

const permissionSlice = createSlice({
  name: "permission",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPermissions.fulfilled, (s, a) => {
        s.items = a.payload;
        s.status = "succeeded";
      })
      .addCase(setPermission.fulfilled, (s, a) => {
        const idx = s.items.findIndex((p) => p.module === a.payload.module);
        if (idx >= 0) s.items[idx] = a.payload;
        else s.items.push(a.payload);
      });
  },
});

export default permissionSlice.reducer;
