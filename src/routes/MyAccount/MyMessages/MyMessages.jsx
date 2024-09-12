import { Container, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getConversations } from "../../../services/notifications";
import Conversation from "../../../components/Conversation";
import WelcomePage from "../WelcomePage";

const MyMessages = ({ isDoctor, markMsgsReadCallback }) => {
  const [t] = useTranslation();
  const [conversations, setConversations] = useState([]);
  const [isLoadingConversations, setIsloadingConversations] = useState(false);

  useEffect(() => {
    const getConversationsApi = async () => {
      try {
        setIsloadingConversations(true);
        const response = await getConversations(isDoctor);
        setConversations(response);
      } catch (err) {
        console.log("could not get conversations from API", err);
      } finally {
        setIsloadingConversations(false);
      }
    };
    getConversationsApi();
  }, []);

  return (
    <Container sx={{ padding: 4, display: "flex", flexDirection: "column" }}>
      {isLoadingConversations ? (
        <CircularProgress
          size={60}
          sx={{ position: "absolute", top: "40%", left: "50%" }}
        /> 
      ) : (
        conversations.length > 0 ? (
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
        )
      )}
    </Container>
  );
};

export default MyMessages;
