import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

const pages = [
  {
    id: 0,
    title: "Home",
    link: "/",
    icon: <CottageOutlinedIcon />,
  },
  {
    id: 1,
    title: "Create Post",
    link: "/create-post",
    icon: <PostAddOutlinedIcon />,
  },
];

export default pages;
