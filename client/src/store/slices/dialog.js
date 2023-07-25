import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editFormDialogOpen: false,
  deleteUserDialogOpen: false,
  deleteProductDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    // for user quick edit
    handleFormOpen: function (state) {
      state.editFormDialogOpen = true;
    },
    handleFormClose: function (state) {
      state.editFormDialogOpen = false;
    },
    // For users table delete
    handleDeleteDialogOpen: function (state) {
      state.deleteUserDialogOpen = true;
    },
    handleDeleteDialogClose: function (state) {
      state.deleteUserDialogOpen = false;
    },
    handleDeleteProductDialogOpen: function (state) {
      state.deleteProductDialogOpen = true;
    },
    handleDeleteProductDialogClose: function (state) {
      state.deleteProductDialogOpen = false;
    },
  },
});

export const dialogAction = dialogSlice.actions;

export default dialogSlice;
