import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async () => {
    const response = await fetch("http://localhost:8080/deals");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dealsSlice.reducer;
export const selectDeals = (state) => state.deals.data;
export const selectDealsLoading = (state) => state.deals.loading;
export const selectDealsError = (state) => state.deals.error;
