import { apiSlice } from "store/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const ordersAdapter = createEntityAdapter();
const initialState = ordersAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
      }),
      transformResponse: (response) => {
        const loadedOrders = response.orders.map((order) => {
          order.id = order._id;
          return order;
        });

        return ordersAdapter.setAll(initialState, loadedOrders);
      },

      // providesTags: (result, error, arg) => {
      //   if (result?.ids) {
      //     return [
      //       { type: "Order", id: "LIST" },
      //       ...result.ids.map((id) => ({ type: "Order", id })),
      //     ];
      //   } else return [{ type: "Order", id: "LIST" }];
      // },
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
} = ordersApiSlice;

export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

export const orderData = createSelector(
  selectOrdersResult,
  (orderResult) => orderResult.data
);

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors((state) => orderData(state) ?? initialState);
