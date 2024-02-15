import { apiSlice } from "store/api/apiSlice";

export const financialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalance: builder.query({
      query: () => ({
        url: "/financials",
      }),
    }),
    getListPayments: builder.query({
      query: () => ({
        url: "/create-payment-intent",
      }),
    }),
  }),
});

export const { useGetAccountBalanceQuery, useGetListPaymentsQuery } =
  financialsApiSlice;
