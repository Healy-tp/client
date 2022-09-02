

// const BubbleTime = (props) => {
//   return (
//     <Chip 
//       key={t}
//       label={t.toJSON().slice(11,16)} 
//       onClick={() => setSelectedData({...selectedData, selectedTime: t})}
//       clickable={true}
//       color="primary" 
//       disabled={appointments.map((a) => ({doctorId: a.doctorId, date: new Date(a.arrivalTime).getTime()})).filter(a => a.doctorId === selectedData.doctorId).map(a => a.date).includes(t.getTime())}
//       variant={ t === selectedData.selectedTime ? "filled": "outlined"}
//     />
//   );
// }
