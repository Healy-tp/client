import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { getConversations } from "../../services/notifications";
import Conversation from "../../components/Conversation";
import WelcomePage from "./WelcomePage";


const MyMessages = ({ isDoctor, markMsgsReadCallback }) => {

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversationsApi = async () => {
      const response = await getConversations(isDoctor);
      setConversations(response);
    }
    getConversationsApi();
  }, []);

  return (
    <Container>
      {
        conversations.length > 0 ? conversations.map(c => (
          <Conversation convData={c} isDoctor={isDoctor} markMsgsReadCallback={markMsgsReadCallback}/>
        )) : (
          <WelcomePage 
            icon='inbox' 
            msg1='Todavia no tienes mensajes'
          />)
      }
    </Container>
  );
}

export default MyMessages;
