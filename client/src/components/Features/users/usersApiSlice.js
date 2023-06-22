import { apiSlice } from "../../../store/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      transformResponse: (response) => {
        const loadedUsers = response.users.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
