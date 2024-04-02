import developmentConfig from "./configs/config.development";
import productionConfig from "./configs/config.production";

const getConfig = () => {
  if (process.env.NODE_ENV === "production") {
    return productionConfig;
  } else {
    return developmentConfig;
  }

};

const config = getConfig();

export default config;
