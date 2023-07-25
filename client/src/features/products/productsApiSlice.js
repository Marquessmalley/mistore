import { apiSlice } from "../../store/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter();
const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      transformResponse: (response) => {
        const loadedProducts = response.products.map((product) => {
          product.id = product._id;
          return product;
        });

        return productsAdapter.setAll(initialState, loadedProducts);
      },

      providesTags: ["Product", "LIST"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
