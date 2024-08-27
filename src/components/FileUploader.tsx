import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props extends React.PropsWithChildren {
  onSubmit: (file: File) => void;
}
const FileUploader = ({ onSubmit, children }: Props) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => onSubmit(acceptedFile[0]),
    []
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

  return (
    <Box
      {...getRootProps()}
      height={100}
      bgcolor="#F0F0F0"
      sx={{
        border: "2px solid #CDCDCD",
        fontSize: 21,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {acceptedFiles[0] ? acceptedFiles[0].name : "Drag or choose file"}
        {!acceptedFiles[0] && children}
      </Box>
    </Box>
  );
};

export default FileUploader;
