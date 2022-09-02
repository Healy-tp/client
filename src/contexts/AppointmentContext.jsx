import { createContext, useState } from "react";

export const AppointmentContext = createContext({
  selectedData: {},
  setSelectedData: () => null,
});

export const AppointmentProvider = ({children}) => {
  const [selectedData, setSelectedData] = useState({
    doctorId: null,
    doctorName: null,
    doctorSpecialty: null,
    datePickerDisabled: true,
    date: null,
    selectedTime: null,
    selectedOffice: null,
  });
  const value = {selectedData, setSelectedData};

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}
