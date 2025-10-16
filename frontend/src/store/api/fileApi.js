import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://react-mongoose-file-explorer-backend.vercel.app/api" }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/items",
      providesTags: ["Items"],
    }),
    createItem: builder.mutation({
      query: (item) => ({
        url: "/items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Items"],
    }),
    renameItem: builder.mutation({
      query: ({ id, name }) => ({
        url: `/items/${id}/rename`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
    updateContent: builder.mutation({
      query: ({ id, content }) => ({
        url: `/items/${id}/content`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: ["Items"],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useRenameItemMutation,
  useDeleteItemMutation,
  useUpdateContentMutation,
} = fileApi
