import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await fetch("http://localhost:8080/customers");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
export const selectCustomers = (state) => state.customers.data;
export const selectLoading = (state) => state.customers.loading;
export const selectError = (state) => state.customers.error;
