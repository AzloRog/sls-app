import {
  createApi,
  fakeBaseQuery,
  TypedUseQuery,
  TypedUseMutation,
} from "@reduxjs/toolkit/query/react";
import supabase from "../../supabaseClient";
import { Tables, TablesInsert } from "../types/database.types";

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["PostText", "PostImage", "FavoritePosts"],
  endpoints: (builder) => ({
    //Post&post text endpoints
    getPosts: builder.query<Tables<"users_posts">[] | any, number>({
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
    addNewPost: builder.mutation<any, TablesInsert<"users_posts">>({
      invalidatesTags: ["PostText"],
      queryFn: async (post) => {
        const { author_name, text, image_url, user_id } = post;
        const { data, error } = await supabase
          .from("users_posts")
          .insert({
            author_name: author_name,
            text,
            image_url: image_url,
            user_id: user_id,
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

    getPostLikedUsers: builder.query<any, string>({
      providesTags: ["FavoritePosts"],
      queryFn: async (postId: string) => {
        const { data, error } = await supabase
          .from("users_posts_likes")
          .select("user_id")
          .eq("post_id", postId);

        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    //PostLikes endpoints
    setPostFavorite: builder.mutation<
      Tables<"users_posts_likes">[],
      { userId: string | undefined; postId: string }
    >({
      invalidatesTags: ["FavoritePosts"],
      queryFn: async (args) => {
        const { userId, postId } = args;

        const { data, error } = await supabase
          .from("users_posts_likes")
          .insert({ user_id: userId, post_id: postId })
          .select();

        if (error) {
          return { error };
        }
        return { data };
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
  useGetPostLikedUsersQuery,
  useSetPostFavoriteMutation,
  useAddNewImageMutation,
  useGetImageQuery,
  useUpdateImageMutation,
  useDeleteImageMutation,
}: {
  useGetPostsQuery: TypedUseQuery<Tables<"users_posts">[] | any, number, any>;
  useAddNewPostMutation: TypedUseMutation<
    any,
    TablesInsert<"users_posts">,
    any
  >;
  useUpdatePostTextMutation: TypedUseMutation<
    string,
    { id: string; text: string },
    any
  >;
  useDeletePostMutation: TypedUseMutation<string, string, any>;
  useGetPostLikedUsersQuery: TypedUseQuery<string[], string, any>;
  useSetPostFavoriteMutation: TypedUseMutation<
    Tables<"users_posts_likes">[],
    { userId: string | undefined; postId: string },
    any
  >;
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
