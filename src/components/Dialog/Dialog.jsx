import {  
  Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText
} from '@mui/material';


const DialogAlert = ({open, handleClose, handleAccept, title, msg}) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
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
