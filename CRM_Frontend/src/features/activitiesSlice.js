import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async () => {
    const response = await fetch("https://salesnest.onrender.com/activities");
    if (!response.ok) throw new Error("Network response was not ok");
    console.log(response.json);
    return await response.json();
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default activitiesSlice.reducer;
export const selectActivities = (state) => state.activities.data;
export const selectLoading = (state) => state.activities.loading;
export const selectError = (state) => state.activities.error;
