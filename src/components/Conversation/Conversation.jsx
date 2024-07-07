import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  TextField,
  Box,
  Button,
  CardActions,
  Link,
  Chip
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import {
  getAttachment,
  getMessages,
  newMessage,
} from "../../services/notifications";
import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Snackbar from "../Snackbar";


const Conversation = ({ convData, isDoctor, markMsgsReadCallback }) => {
  const [t] = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState(null);

  const { currentUser } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { open, message, type } = snackbar;

  useEffect(() => {
    const getMessagesFromApi = async () => {
      try {
        const response = await getMessages(convData.id);
        setMessages(response);
      } catch (err) {
        console.log("could not fetch messages from server", err);
        setSnackbar({
          type: "error",
          open: true,
          message: t('errors.generic_error'),
        });
      }
    };

    getMessagesFromApi();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("toUserId", isDoctor ? convData.userId : convData.doctorId);
    formData.append("message", inputText);
    formData.append("convId", convData.id);
    try {
      const msgPayload = {
        toUserId: isDoctor ? convData.userId : convData.doctorId,
        message: inputText,
        convId: convData.id,
      };
      if (attachment) {
        formData.append("attachment", attachment);
        msgPayload["fileName"] = attachment.name;
      }
      const response = await newMessage(formData, {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      });
      setMessages([...messages, { ...msgPayload, id: response.id, fromUserId: currentUser.id }]);
    } catch (err) {
      console.log("could not POST new message", err);
      setSnackbar({
        type: "error",
        open: true,
        message: t('errors.message_not_sent'),
      });
    }
    setInputText("");
    setAttachment(null);
  };


  const handleGetAttachment = async (msgId, fileName) => {
    console.log("message id", msgId, "filename", fileName);
    try {
      const response = await getAttachment(msgId);
      let url = window.URL.createObjectURL(new Blob([response.data]));
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    } catch (err) {
      setSnackbar({
        type: "error",
        open: true,
        message: t('errors.download_attachment_error'),
      });
      console.log(err);
    }
  };

  return (
    <Accordion
      sx={{ marginTop: 2 }}
      onChange={() => {
        markMsgsReadCallback(convData.id);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>
          <Typography>
            {t('my_account.chat.title')}: 
          </Typography>
          <Chip label={isDoctor 
            ? ` ${convData.User.firstName} ${convData.User.lastName}`
            : ` ${convData.Doctor.firstName} ${convData.Doctor.lastName}`}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {messages.map((m) => {
          const params =
            m.fromUserId !== currentUser.id
              ? { marginTop: 2, mr: 75, borderRadius: 5 }
              : { marginTop: 2, ml: 100, borderRadius: 5, textAlign: "right" };
          return (
            <Card sx={params} key={m.id} >
              <CardContent>{m.message}</CardContent>
              {m.fileName && (
                <CardActions>
                  {t('my_account.chat.attached')}:&nbsp;
                  <Link
                    component="button"
                    download
                    onClick={() => handleGetAttachment(m.id, m.fileName)}
                  >
                    {m.fileName}
                  </Link>
                </CardActions>
              )}
            </Card>
          );
        })}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
        >
          <TextField
            required
            fullWidth
            value={inputText}
            name="new-message"
            label={t('my_account.chat.new_message')}
            type="new-message"
            onChange={(event) => {
              setInputText(event.target.value);
            }}
            id="new-message"
          />
          <Button
            variant="contained"
            component="label"
            color="secondary"
            style={{ marginLeft: 10 }}
            sx={{ borderRadius: 50 }}
          >
            <AttachFileIcon />
            <input
              type="file"
              onChange={(event) => {
                setAttachment(event.target.files[0]);
              }}
              hidden
            />
          </Button>
          <Button
            type="submit"
            style={{ marginLeft: 10 }}
            disabled={!inputText}
            onClick={handleSubmit}
            variant="contained"
            component="label"
            sx={{ borderRadius: 50 }}
          >
            <SendIcon />
          </Button>
        </Box>
        {attachment && attachment.name}
      </AccordionDetails>
      <Snackbar
        open={open}
        handleClose={handleCloseSnackbar}
        message={message}
        type={type}
      />
    </Accordion>
  );
};

export default Conversation;
