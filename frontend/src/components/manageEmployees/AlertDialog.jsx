import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import create from 'zustand';

const useConfirmDialogStore = create((set) => ({
  title: '',
  message: '',
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (title, message, onSubmit) => {
  useConfirmDialogStore.setState({
    title,
    message,
    onSubmit,
  });
};

const AlertDialog = () => {
 
  const {title, message, textInput, onSubmit, close } = useConfirmDialogStore();

  return (
    <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth> 
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
        <TextField 
        fullWidth
          value={textInput}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={close}>
          Avbryt
        </Button>
        <Button
          sx={{bgcolor:"darkred"}}
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
          Bekräfta
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

