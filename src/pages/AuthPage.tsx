import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import useRedirect from "../hooks/useRedirect";

const AuthPage = () => {
  useRedirect();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthPage;
