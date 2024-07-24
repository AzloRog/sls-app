import { Box, CircularProgress, List, ListItem } from "@mui/material";
import { useEffect } from "react";
import PostCard from "./ui/PostCard";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { useGetPostsQuery } from "../services/supabase";
import { increasePostsPage } from "../features/interface/interfaceSlice";

const Posts = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((store) => store.interface.postsPage);

  const { data, isFetching, error } = useGetPostsQuery(page);

  useEffect(() => {
    const onScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isScrolledToBottom && !isFetching) {
        dispatch(increasePostsPage());
      }
    };

    if (!error) {
      document.addEventListener("scroll", onScroll);
    }

    return () => document.removeEventListener("scroll", onScroll);
  }, [page, isFetching]);

  return (
    <Box component="div">
      <List sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
        {data?.map((post) => (
          <ListItem key={post.id} sx={{ p: 0 }}>
            <PostCard
              id={post.id}
              userId={post.userId}
              authorName={post.authorName}
              text={post.text}
              imageUrl={post.imageUrl}
              createdAt={post.createdAt}
            />
          </ListItem>
        ))}
      </List>
      {isFetching && (
        <Box
          sx={{
            mt: 8,
            mb: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Posts;
