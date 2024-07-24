import { MenuItem, MenuList, styled, MenuItemProps } from "@mui/material";
import { Link, Box } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import { useState } from "react";
import pages from "../constants/pages";

const CustomNenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  display: "block",
  height: 60,
  fontSize: 20,

  "& > .MuiTypography-root": {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  "& .MuiBox-root": {
    flex: "1",
  },
}));
const SideMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <MenuList sx={{ position: "sticky", top: 140 }}>
      {pages.map((page) => (
        <CustomNenuItem
          key={page.id}
          onClick={() => setSelectedIndex(page.id)}
          selected={selectedIndex == page.id && true}
        >
          <Link component={RouteLink} to={page.link} flex="1">
            {page.icon}
            <Box>{page.title}</Box>
          </Link>
        </CustomNenuItem>
      ))}
    </MenuList>
  );
};

export default SideMenu;
