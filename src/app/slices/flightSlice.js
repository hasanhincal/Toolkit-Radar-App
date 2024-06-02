import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightAction";

const initialState = {
  flights: [],
  isLoading: true,
  isError: null,
  path: [],
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
  extraReducers: (builder) => {
    //*cevap beklerken
    builder
      .addCase(getFlights.pending, (state) => {
        state.isLoading = true;
      })

      //* olumlu cevap geldiğinde;
      .addCase(getFlights.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.flights = action.payload);
      })

      //* olumsuz cevap geldiğinde;
      .addCase(getFlights.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = "Uçuş verilerini alırken bir hata oluştu!");
      });
  },
});

export default flightSlice.reducer;
export const { setPath } = flightSlice.actions;
