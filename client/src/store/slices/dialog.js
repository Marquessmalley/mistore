import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editFormDialogOpen: false,
  deleteUserDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    handleFormOpen: function (state) {
      state.editFormDialogOpen = true;
    },
    handleFormClose: function (state) {
      state.editFormDialogOpen = false;
    },
    handleDeleteDialogOpen: function (state) {
      state.deleteUserDialogOpen = true;
    },
    handleDeleteDialogClose: function (state) {
      state.deleteUserDialogOpen = false;
    },
  },
});

export const dialogAction = dialogSlice.actions;

export default dialogSlice;
