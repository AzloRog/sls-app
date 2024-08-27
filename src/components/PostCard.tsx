import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardMedia,
  CardContent,
  CircularProgress,
  TextareaAutosize,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";

import {
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../store/services/PostsService";
import { useAppSelector } from "../store/hook";

import ExpandMenu from "./ExpandMenu";
import { useState } from "react";

interface Props {
  id: string;
  userId: string;
  authorName: string | null;
  text: string;
  imageUrl: string | null;
  createdAt: string;
}
export enum Mode {
  default,
  editing,
}

const PostCard = ({
  id,
  userId,
  authorName,
  text,
  imageUrl,
  createdAt,
}: Props) => {
  const [mode, setMode] = useState<Mode>(Mode.default);
  const [tempText, setTempText] = useState<string>(text);

  const [updatePost, { isLoading: isUpdateProcess }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const session = useAppSelector((store) => store.user.session);
  const date = new Date(createdAt!.split("+")[0] + "Z");

  const handleUpdatePost = async () => {
    await updatePost({ id, text: tempText });
    setMode(Mode.default);
    location.reload(); //Перезагрузка страницы т.к. невозможно обновить кэш redux при использовании infinite scroll (merge)
  };
  const handleDeletePost = async () => {
    await deletePost(id);

    location.reload(); //Перезагрузка страницы т.к. невозможно обновить кэш redux при использовании infinite scroll (merge)
  };

  const cardActions =
    mode == Mode.editing ? (
      <CardActions sx={{ mt: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => setMode(Mode.default)}>
          Decline
        </Button>
        <Button variant="contained" onClick={handleUpdatePost}>
          {isUpdateProcess ? <CircularProgress /> : "Save"}
        </Button>
      </CardActions>
    ) : (
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    );

  const cardContent = (
    <CardContent sx={{ marginTop: 1 }}>
      {mode == Mode.default ? (
        <>
          {imageUrl && (
            <CardMedia
              component="img"
              height="460"
              src={imageUrl}
              alt="Paella dish"
            />
          )}
          <Typography
            variant="body2"
            color="text.primary"
            whiteSpace={"pre-wrap"}
            sx={{ overflowWrap: "break-word" }}
          >
            {text}
          </Typography>
        </>
      ) : (
        <TextareaAutosize
          style={{ width: "100%", minHeight: 80 }}
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
        />
      )}
    </CardContent>
  );

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {authorName?.charAt(0) || "A"}
          </Avatar>
        }
        action={
          session!.user.id == userId ? (
            <ExpandMenu
              options={[
                { name: "Edit", action: () => setMode(Mode.editing) },
                { name: "Delete", action: handleDeletePost },
              ]}
            />
          ) : null
        }
        title={authorName || "Anonim"}
        subheader={date.toDateString() + " " + date.toLocaleTimeString()}
      />
      {cardContent}
      {cardActions}
    </Card>
  );
};

export default PostCard;
