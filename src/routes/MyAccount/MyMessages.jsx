import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { getConversations } from "../../services/notifications";
import Conversation from "../../components/Conversation";


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
        conversations.map(c => (
          <Conversation convData={c} isDoctor={isDoctor} markMsgsReadCallback={markMsgsReadCallback}/>
        ))
      }
    </Container>
  );
}

export default MyMessages;
