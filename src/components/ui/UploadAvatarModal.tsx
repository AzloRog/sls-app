import { Modal, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setIsModalOpen } from "../../features/interface/interfaceSlice";

const UploadAvatarModal = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((store) => store.interface.isModalOpen);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => dispatch(setIsModalOpen(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <input type="file" />
      </Box>
    </Modal>
  );
};

export default UploadAvatarModal;
