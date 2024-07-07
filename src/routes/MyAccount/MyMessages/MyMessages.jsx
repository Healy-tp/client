import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getConversations } from "../../../services/notifications";
import Conversation from "../../../components/Conversation";
import WelcomePage from "../WelcomePage";

const MyMessages = ({ isDoctor, markMsgsReadCallback }) => {
  const [t] = useTranslation();
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
    <Container sx={{ padding: 4, display: "flex", flexDirection: "column" }}>
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
        <WelcomePage icon="inbox" title={t('my_account.my_messages.no_messages_title')} />
      )}
    </Container>
  );
};

export default MyMessages;
