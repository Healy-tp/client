import {  
  Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText
} from '@mui/material';


const DialogAlert = ({open, handleClose, handleAccept}) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Start conversation with doctor?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si aceptas, iniciaras una conversacion con el doctor seleccionado. El chat quedara abierto hasta 
          X dias luego del turno.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button onClick={handleAccept} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default DialogAlert;
