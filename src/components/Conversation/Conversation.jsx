import { Container, Accordion, AccordionSummary, 
  AccordionDetails, Typography, Card, CardContent, TextField, Box, Button } from "@mui/material";
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from "react";
import { getMessages, newMessage } from "../../services/notifications";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Conversation = ({ convData, isDoctor, markMsgsReadCallback }) => {

  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const getMessagesFromApi = async () => {
      const response = await getMessages(convData.id);
      setMessages(response);
    }
    
    getMessagesFromApi();
  }, []);

  const {currentUser} = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const msgPayload = {
        toUserId: isDoctor ? convData.userId : convData.doctorId,
        message: inputText,
        convId: convData.id,
      }
      const response = await newMessage(msgPayload);
      setMessages([...messages, {...msgPayload, fromUserId: currentUser.id}]);
    } catch (err) {

    }

    setInputText('');
  }

  

  return (
    <Accordion sx={{marginTop: 2}} onChange={() => {markMsgsReadCallback(convData.id)}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Chat with: {isDoctor ? convData.User.firstName : convData.Doctor.firstName} { isDoctor ? convData.User.lastName :convData.Doctor.lastName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          messages.map((m) => {
            const params = m.fromUserId !== currentUser.id ? {marginTop: 2, mr: 75, borderRadius: 5} : {marginTop: 2, ml: 75, borderRadius: 5, textAlign: 'right'};
            return (
              <Card sx={params}>
                <CardContent>
                  {m.message}
                </CardContent>
              </Card>
            )
        })
        }
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            sx={{marginTop: 10}}
            value={inputText}
            name="new-message"
            label="New Message"
            type="new-message"
            onChange={(event)=> {
              setInputText(event.target.value);
            }}
            id="new-message"
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}


export default Conversation;
