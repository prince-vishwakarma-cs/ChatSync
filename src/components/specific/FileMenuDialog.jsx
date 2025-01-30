import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import { useRef } from "react";
import { File, Headphones, Image, Video } from "react-feather";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSendAttachmentsMutation } from "../../redux/api/api";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";

const FileMenu = ({ anchorE1, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);
      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });
    
      // Fetching Here
    } catch (error) {
      toast.error(error?.data?.message, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu
      anchorEl={anchorE1}
      open={isFileMenu}
      onClose={closeFileMenu}
      PaperProps={{
        style: {
          width: "10rem",
          backgroundColor: "#2b2d31", // Dark background for the popup
          color: "white",
          borderRadius: "1.5rem", // Rounded corners for the popup
          // fontFamily: "inherit",
        },
      }}
    >
      <MenuList style={{ fontFamily: "inherit" }}>
        <MenuItem style={{ fontFamily: "inherit" }} onClick={selectImage}>
          <Tooltip title="Image">
            <Image />
          </Tooltip>
          <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Images")}
            ref={imageRef}
          />
        </MenuItem>

        <MenuItem onClick={selectAudio}>
          <Tooltip title="Audio">
            <Headphones />
          </Tooltip>
          <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
          <input
            type="file"
            multiple
            accept="audio/mpeg, audio/wav"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Audios")}
            ref={audioRef}
          />
        </MenuItem>

        <MenuItem onClick={selectVideo}>
          <Tooltip title="Video">
            <Video />
          </Tooltip>
          <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
          <input
            type="file"
            multiple
            accept="video/mp4, video/webm, video/ogg"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Videos")}
            ref={videoRef}
          />
        </MenuItem>

        <MenuItem onClick={selectFile}>
          <Tooltip title="File">
            <File />
          </Tooltip>
          <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
          <input
            type="file"
            multiple
            accept="*"
            style={{ display: "none" }}
            onChange={(e) => fileChangeHandler(e, "Files")}
            ref={fileRef}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
