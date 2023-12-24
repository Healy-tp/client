import theme from "../../../../../../theme";
import { APPOINTMENT_STATUS } from "../../../../../../utils/constants";

const statusColor = (status) => {
  switch (status) {
    case APPOINTMENT_STATUS.CREATED:
      return theme.palette.primary.light;
    case APPOINTMENT_STATUS.TO_CONFIRM:
      return theme.palette.warning.light;
    case APPOINTMENT_STATUS.CANCELLED:
      return theme.palette.error.light;
    case APPOINTMENT_STATUS.ATTENDED:
      return theme.palette.success.light;
    default:
      return theme.palette.primary.light;
  }
};

export default statusColor;
