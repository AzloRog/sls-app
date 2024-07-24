import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import supabase from "../../supabaseClient";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setIsModalOpen } from "../../features/interface/interfaceSlice";
import { useState } from "react";

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.session?.user);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = async () => {
    supabase.auth.signOut();
  };

  const handleToggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Profile menu">
        <IconButton
          onClick={handleToggleMenu}
          size="small"
          aria-controls={isMenuOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? "true" : undefined}
        >
          <Avatar>{user?.user_metadata.name?.charAt(0)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 20,
            sx: {
              overflow: "visible",

              mt: 1.5,

              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 19,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem
          disabled
          onClick={() => {
            handleCloseMenu();
            dispatch(setIsModalOpen(true));
          }}
        >
          <Avatar />
          Change avatar
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleLogout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
