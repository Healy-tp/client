import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getConversations } from "../../../services/notifications";
import Conversation from "../../../components/Conversation";
import WelcomePage from "../WelcomePage";

const MyMessages = ({ isDoctor, markMsgsReadCallback }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversationsApi = async () => {
      try {
        const response = await getConversations(isDoctor);
        setConversations(response);
      } catch (err) {
        console.log("could not get conversations from API", err);
      }
    };
    getConversationsApi();
  }, []);

  return (
    <Container>
      {conversations.length > 0 ? (
        conversations.map((conv) => (
          <Conversation
            key={conv.id}
            convData={conv}
            isDoctor={isDoctor}
            markMsgsReadCallback={markMsgsReadCallback}
          />
        ))
      ) : (
        <WelcomePage icon="inbox" title="Todavia no tienes mensajes" />
      )}
    </Container>
  );
};

export default MyMessages;
