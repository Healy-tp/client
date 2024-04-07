import * as React from "react";
import { useTranslation } from 'react-i18next';
import { 
  Typography,
  Container,
  Link,
  Grid,
  Box,
  Select,
  MenuItem 
} from "@mui/material";
import facebookIcon from "../../assets/appFooterFacebook.png";
import twitterIcon from "../../assets/appFooterTwitter.png";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://mui.com/">
        Healy
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "primary.light",
  mr: 1,
  "&:hover": {
    bgcolor: "secondary.light",
  },
};

const LANGUAGES = [
  {
    code: "es",
    name: "Español",
  },
  {
    code: "en",
    name: "English",
  }
];

export default function AppFooter() {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }

  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "primary.main" }}
    >
      <Container sx={{ my: 4, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <img src={facebookIcon} alt="Facebook" />
                </Box>
                <Box
                  component="a"
                  href="https://twitter.com/MUI_hq"
                  sx={iconStyle}
                >
                  <img src={twitterIcon} alt="Twitter" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <Typography
              variant="h6"
              marked="left"
              sx={{ color: "primary.light" }}
              gutterBottom
            >
              {t('footer.legal')}
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link
                  href="/premium-themes/onepirate/terms/"
                  sx={{ color: "primary.light" }}
                >
                  {t('footer.terms_and_conditions')}
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link
                  href="/premium-themes/onepirate/privacy/"
                  sx={{ color: "primary.light" }}
                >
                  {t('footer.privacy_policy')}
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography
              variant="h6"
              marked="left"
              sx={{ color: "primary.light" }}
              gutterBottom
            >
              {t('footer.language')}
            </Typography>
            <Select
              id="languages-select"
              name="languages"
              value={i18n.language}
              onChange={changeLanguageHandler}
              sx={{ color: "primary.light", bgcolor: "primary.main", borderRadius: 1, borderColor: "primary.light", borderWidth: 1, borderStyle: "solid"}}
            >
              {LANGUAGES.map((language) => (
                <MenuItem key={language.code} value={language.code}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
