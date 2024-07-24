import {
  createApi,
  fakeBaseQuery,
  TypedUseQuery,
  TypedUseMutation,
} from "@reduxjs/toolkit/query/react";
import supabase from "../supabaseClient";
import { CamelCaseDatabase } from "../types/supabase";
export type PostType =
  CamelCaseDatabase["public"]["Tables"]["users_posts"]["Row"];
export interface addPost
  extends Omit<PostType, "authorName" | "createdAt" | "id" | "imageUrl"> {
  authorName: string;
  createdAt?: string;
  id?: string;
  imageUrl?: string;
}

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["PostText", "PostImage"],
  endpoints: (builder) => ({
    //Post&post text endpoints
    getPosts: builder.query<PostType[] | null, number>({
      providesTags: ["PostText"],
      queryFn: async (pageNumber: number) => {
        const limit = 10;
        let { data, error } = await supabase
          .from("users_posts")
          .select(
            "id, userId: user_id, createdAt: created_at, authorName: author_name, text, imageUrl: image_url"
          )
          .order("created_at", { ascending: false })
          .range(
            pageNumber * limit + (pageNumber == 0 ? 0 : 1),
            pageNumber * limit + limit
          );

        if (error) {
          return { error };
        }
        if (data!.length <= 0) {
          return { error: "List ended" };
        }
        return { data };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currCacheData, newData) => {
        newData && currCacheData!.push(...newData);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    addNewPost: builder.mutation<any, addPost>({
      invalidatesTags: ["PostText"],
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
    updatePostText: builder.mutation<string, { id: string; text: string }>({
      invalidatesTags: ["PostText"],

      queryFn: async (args) => {
        const { id, text } = args;
        const { error } = await supabase
          .from("users_posts")
          .update({ text: text })
          .eq("id", id);

        if (error) {
          return { error };
        }
        return { data: text };
      },
    }),
    deletePost: builder.mutation<string, string>({
      invalidatesTags: ["PostText"],
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
    }),

    //Post image endpoints
    addNewImage: builder.mutation<object, { path: string; image: File }>({
      queryFn: async (arg) => {
        const { path, image } = arg;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(path, image);

        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    getImage: builder.query<string, string>({
      queryFn: async (imageUrl: string) => {
        const { data, error } = await supabase.storage
          .from("public/images")
          .download(imageUrl);
        if (error) {
          throw new Error(error.message);
        }
        const image = URL.createObjectURL(data);
        return { data: image };
      },
    }),
    updateImage: builder.mutation<File, { path: string; image: File }>({
      queryFn: async (args) => {
        const { path, image } = args;
        const { error } = await supabase.storage
          .from("images")
          .update(path, image);

        if (error) {
          return { error };
        }
        return { data: image };
      },
    }),
    deleteImage: builder.mutation<string, string>({
      queryFn: async (url: string) => {
        const { error } = await supabase.storage.from("images").remove([url]);

        if (error) {
          return { error };
        }
        return { data: url };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostTextMutation,
  useDeletePostMutation,
  useAddNewImageMutation,
  useGetImageQuery,
  useUpdateImageMutation,
  useDeleteImageMutation,
}: {
  useGetPostsQuery: TypedUseQuery<PostType[] | null, number, any>;
  useAddNewPostMutation: TypedUseMutation<any, addPost, any>;
  useUpdatePostTextMutation: TypedUseMutation<
    string,
    { id: string; text: string },
    any
  >;
  useDeletePostMutation: TypedUseMutation<string, string, any>;
  useAddNewImageMutation: TypedUseMutation<
    object,
    { path: string; image: File },
    any
  >;
  useGetImageQuery: TypedUseQuery<string, string, any>;
  useUpdateImageMutation: TypedUseMutation<
    File,
    { path: string; image: File },
    any
  >;
  useDeleteImageMutation: TypedUseMutation<string, string, any>;
} = supabaseApi;
