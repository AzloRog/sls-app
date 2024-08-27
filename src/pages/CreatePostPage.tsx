import {
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import FileUploader from "../components/FileUploader";
import getCodeNameByImage from "../utils/getCodeNameByImage";

import { useAddNewPostMutation } from "../store/services/PostsService";
import { useAppSelector } from "../store/hook";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const session = useAppSelector((store) => store.user.session);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let filePath = null;
    if (file) {
      filePath = getCodeNameByImage(file);
    }

    const { error } = await addNewPost({
      authorName: session!.user.user_metadata.name as string,
      text,
      imageUrl: filePath,
      image: file,
      userId: session!.user.id,
    });

    if (error) {
      console.error(error);
      return;
    }
    location.reload();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Box
        component="form"
        sx={{
          fontSize: 21,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <Typography variant="h6" component="h2" mb={1}>
            Post text
          </Typography>
          <TextareaAutosize
            minRows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="h6" component="h2" mb={1}>
            Add image
          </Typography>
          <FileUploader onSubmit={(file) => setFile(file)}>
            <Box component="div" fontSize={12} color="gray">
              JPG, PNG, SVG
            </Box>
          </FileUploader>
        </Box>
        <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setText("");
              setFile(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePostPage;
