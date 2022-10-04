import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { getConversations } from "../../services/notifications";
import Conversation from "../../components/Conversation";


const MyMessages = ({ isDoctor }) => {

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversationsApi = async () => {
      const response = await getConversations(isDoctor);
      console.log('CONVERSATIONS', response);
      setConversations(response);
    }
    getConversationsApi();
  }, []);

  return (
    <Container>
      {
        conversations.map(c => (
          <Conversation data={c}/>
        ))
      }
    </Container>
  );
}

export default MyMessages;
