import { Box, List, ListItem } from "@mui/material";
import PostCard from "./ui/PostCard";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { increasePostsPage } from "../store/features/interface/interfaceSlice";
import { useGetPostsListQuery } from "../store/services/PostsService";
import usePagination from "../hooks/usePagination";

const PAGES_RANGE = 5;

const PostsList = () => {
  const page = useAppSelector((store) => store.interface.postsPage);
  const dispatch = useAppDispatch();

  const { data, error, isFetching } = useGetPostsListQuery({
    pageNumber: page,
    range: PAGES_RANGE,
  });
  const [lastPostElementRef] = usePagination(
    () => dispatch(increasePostsPage()),
    isFetching
  );

  if (error) {
    return (
      <Box
        sx={{
          mt: 8,
          mb: 6,
          fontSize: 26,
          color: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Error, Can't get data from server API
      </Box>
    );
  }

  return (
    <List sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
      {data?.map((post, index) => (
        <ListItem
          key={post.id}
          sx={{ p: 0 }}
          ref={data.length === index + 1 ? lastPostElementRef : null}
        >
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
  );
};

export default PostsList;
