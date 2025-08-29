import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async () => {
    const response = await fetch("https://salesnest.onrender.com/leads");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leadsSlice.reducer;
export const selectLeads = (state) => state.leads.data;
export const selectLeadsLoading = (state) => state.leads.loading;
export const selectLeadsError = (state) => state.leads.error;
