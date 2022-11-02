import { createContext, useState } from "react";

export const AppointmentContext = createContext({
  selectedData: {},
  setSelectedData: () => null,
});

const defaultValues = {
  doctorId: null,
  doctorName: null,
  doctorSpecialty: null,
  datePickerDisabled: true,
  date: null,
  selectedTime: null,
  selectedOffice: null,
  extraAppt: false,
}

export const AppointmentProvider = ({children}) => {
  const [selectedData, setSelectedData] = useState(defaultValues);

  const setDefaultValues = () => setSelectedData(defaultValues);

  const value = {selectedData, setSelectedData, setDefaultValues};

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}
