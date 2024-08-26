import { Typography } from "@mui/material";
import PostsList from "../components/PostsList";
import useRedirect from "../hooks/useRedirect";

const HomePage = () => {
  useRedirect();

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={700}
        mb={4}
        letterSpacing={2}
      >
        Home feed
      </Typography>
      <PostsList />
    </>
  );
};

export default HomePage;
