import {
  createApi,
  fakeBaseQuery,
  TypedUseQuery,
  TypedUseMutation,
} from "@reduxjs/toolkit/query/react";
import supabase from "../../supabaseClient";

export interface Post {
  id: string;
  userId: string;
  createdAt: string;
  authorName: string | null;
  text: string;
  imageUrl: string | null;
}

export const postsService = createApi({
  reducerPath: "PostsService",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPostsList: builder.query<
      Post[] | null,
      { pageNumber: number; range: number }
    >({
      queryFn: async (args) => {
        const { pageNumber, range } = args;
        let { data, error } = await supabase
          .from("users_posts")
          .select(
            "id, userId: user_id, createdAt: created_at, authorName: author_name, text, imageUrl: image_url"
          )
          .order("created_at", { ascending: false })
          .range(
            (pageNumber - 1) * range,
            (pageNumber - 1) * range + (range - 1)
          );

        if (error) {
          return { error };
        }
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Posts" as const,
                id,
              })),
              { type: "Posts", id: "PARTIAL_LIST" },
            ]
          : [{ type: "Posts", id: "PARTIAL_LIST" }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currCacheData, newData) => {
        newData && currCacheData!.push(...newData);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.pageNumber !== previousArg?.pageNumber;
      },
    }),

    getPost: builder.query<Post, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("users_posts")
          .select("*")
          .eq("id", id);

        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    addNewPost: builder.mutation<any, Partial<Post> & Pick<Post, "text">>({
      queryFn: async (post) => {
        const { authorName, text, imageUrl, userId } = post;
        const { data, error } = await supabase
          .from("users_posts")
          .insert({
            author_name: authorName,
            text,
            image_url: imageUrl,
            user_id: userId,
          })
          .select();
        if (error) {
          return { error };
        }

        return { data };
      },
    }),

    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      queryFn: async (args) => {
        const { id, ...patch } = args;
        const { data, error } = await supabase
          .from("users_posts")
          .update(patch)
          .eq("id", id);

        if (error) {
          return { error };
        }
        return { data };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsService.util.updateQueryData("getPost", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deletePost: builder.mutation<string, string>({
      queryFn: async (id: string) => {
        const { error } = await supabase
          .from("users_posts")
          .delete()
          .eq("id", id);

        if (error) {
          return { error };
        }
        return { data: id };
      },
      invalidatesTags: (id) => [
        { type: "Posts", id },
        { type: "Posts", id: "PARTIAL_LIST" },
      ],
    }),
  }),
});

export const {
  useGetPostsListQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
}: {
  useGetPostsListQuery: TypedUseQuery<
    Post[] | null,
    { pageNumber: number; range: number },
    any
  >;
  useGetPostQuery: TypedUseQuery<Post, string, any>;
  useAddNewPostMutation: TypedUseMutation<
    any,
    Partial<Post> & Pick<Post, "text">,
    any
  >;
  useUpdatePostMutation: TypedUseMutation<
    Post,
    Partial<Post> & Pick<Post, "id">,
    any
  >;
  useDeletePostMutation: TypedUseMutation<string, string, any>;
} = postsService;
