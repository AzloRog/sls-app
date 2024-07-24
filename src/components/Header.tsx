import { AppBar, Toolbar, Typography } from "@mui/material";
import ProfileMenu from "./ui/ProfileMenu";

const Header = () => {
  return (
    <AppBar sx={{ backgroundColor: "#42415A", py: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontFamily={"sans-serif"}>
          Daniel's Social App
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
