import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  TextareaAutosize,
  CardActions,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { CamelCaseDatabase } from "../../types/supabase";
import {
  useGetImageQuery,
  useDeletePostMutation,
  useUpdatePostTextMutation,
  useDeleteImageMutation,
} from "../../services/supabase";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../../store/hook";
import ExpandMenu from "./ExpandMenu";
import { useState } from "react";
type Props = CamelCaseDatabase["public"]["Tables"]["users_posts"]["Row"];
export type Mode = "default" | "editing";

const PostCard = ({
  id,
  userId,
  authorName,
  text,
  imageUrl,
  createdAt,
}: Props) => {
  const [mode, setMode] = useState<Mode>("default");
  const [tempText, setTempText] = useState<string>(text);

  const [updatePost, { isLoading: isUpdateProcess }] =
    useUpdatePostTextMutation();

  const { data: image, isSuccess } = useGetImageQuery(imageUrl ?? skipToken);
  const [deletePost, { isLoading: isDeleteProcess }] = useDeletePostMutation();
  const [deleteImage] = useDeleteImageMutation();

  const session = useAppSelector((store) => store.user.session);
  const date = new Date(createdAt!.split("+")[0] + "Z");

  const handleUpdatePost = async () => {
    await updatePost({ id, text: tempText });

    location.reload();
  };
  const handleDeletePost = async () => {
    await deletePost(id);

    if (imageUrl) {
      await deleteImage(imageUrl);
    }
    location.reload();
  };

  return (
    <Card
      sx={{ width: "100%" }}
      className={isDeleteProcess ? "deleting-el" : ""}
    >
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
                { name: "Edit", action: () => setMode("editing") },
                { name: "Delete", action: handleDeletePost },
              ]}
            />
          ) : null
        }
        title={authorName || "Anonim"}
        subheader={date.toDateString() + " " + date.toLocaleTimeString()}
      />
      {imageUrl &&
        (isSuccess ? (
          <CardMedia
            component="img"
            image={image}
            sx={{ maxHeight: 480, objectFit: "contain" }}
          />
        ) : (
          <Box
            height={360}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F5F5F5",
            }}
          >
            <CircularProgress />
          </Box>
        ))}
      <CardContent sx={{ marginTop: 1 }}>
        {mode == "default" ? (
          <Typography
            variant="body2"
            color="text.primary"
            whiteSpace={"pre-wrap"}
            sx={{ overflowWrap: "break-word" }}
          >
            {text}
          </Typography>
        ) : (
          <TextareaAutosize
            style={{ width: "100%", minHeight: 80 }}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
          />
        )}
      </CardContent>
      {mode == "editing" && (
        <CardActions sx={{ mt: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={() => setMode("default")}>
            Decline
          </Button>
          <Button variant="contained" onClick={handleUpdatePost}>
            {isUpdateProcess ? <CircularProgress /> : "Save"}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
