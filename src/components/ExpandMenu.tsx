import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useState } from "react";

export interface option {
  name: string;
  action: (args?: any) => any;
}
interface Props {
  options: option[];
}
const ExpandMenu = ({ options }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            selected={option.name === "Pyxis"}
            onClick={() => {
              handleClose();
              option.action();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ExpandMenu;
