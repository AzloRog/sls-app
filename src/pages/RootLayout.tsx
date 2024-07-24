import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Header";
import UploadAvatarModal from "../components/ui/UploadAvatarModal";
import useRedirect from "../hooks/useRedirect";

import SideMenu from "../components/SideMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import pages from "../constants/pages";

const RootLayout = () => {
  const [value, setValue] = useState(0);

  const matches = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();
  useRedirect();

  const handleRedirect = (value: number) => {
    setValue(value);
    switch (value) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/create-post");
        break;
    }
  };
  return (
    <>
      <Header />
      {matches ? (
        <Container
          maxWidth="xl"
          sx={{
            mt: 15,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={3} mt={10}>
              <SideMenu />
            </Grid>
            <Grid item xs={6}>
              <Outlet />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <UploadAvatarModal />
        </Container>
      ) : (
        <>
          <Container disableGutters sx={{ px: "20px", pb: 10 }}>
            <Grid container mt={12}>
              <Grid item xs={12}>
                <Outlet />
              </Grid>
            </Grid>
          </Container>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {
              handleRedirect(newValue);
            }}
            sx={{
              position: "fixed",
              width: "100%",
              bottom: "0px",
              left: "0px",
            }}
          >
            {pages.map((page) => (
              <BottomNavigationAction
                key={page.id}
                label={page.title}
                icon={page.icon}
              />
            ))}
          </BottomNavigation>
        </>
      )}
    </>
  );
};

export default RootLayout;
