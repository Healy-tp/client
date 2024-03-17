import React from "react";
import { useTranslation } from 'react-i18next';
import { Box, Typography } from "@mui/material";
import errorImg from "../../assets/404.png";

const ErrorPage = () => {
  const [t] = useTranslation();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={errorImg}
        alt="Not found"
        width="200"
        height="200"
        style={{ marginBottom: "18px" }}
      />
      <Typography variant="h2">{t('page_not_found.title')}</Typography>
      <Typography variant="h5">
        {t('page_not_found.body')}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
