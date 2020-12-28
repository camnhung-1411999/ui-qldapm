import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {transactionAction} from '../../../redux/actions';
import { useDispatch} from 'react-redux';
export default function AlertDialog({id}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(transactionAction.deleteTransaction(id));
        setOpen(false);
    }
    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon  />

            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"ARE YOU SURE?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure delete this file ?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary">
                        Yes
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
