import React from 'react'
import {
    Button,
    TableCell,
    TableRow,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useDispatch } from 'react-redux';
import { fileAction } from '../../../redux/actions';
import Slide from '@material-ui/core/Slide';
import { transactionService} from '../../../api';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function File({ file }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [iopen, setIOpen] = React.useState(false);
    const [sopen, setSOpen] = React.useState(false);
    const [idelete, setIDelete] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [receiver, setReceiver] = React.useState('');
    const [error, setError] = React.useState();
    const handleDelete = () => {
        dispatch(fileAction.deleteFile(file._id));
        setIDelete(false);
    }

    const handleDownload = () => {
        window.open(file.path)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSign = async () => {
        dispatch(fileAction.sign(file._id));
        setSOpen(false);
    }
    const handleSend = async () => {
        await transactionService.createTransaction({
            receiver,
            fileId: file._id
        }).then(() => {
            setOpen(false);
            setIOpen(true);
            setReceiver('');
        }).catch((err) => {
            setError('*Email not exist or do not have account');
        })

    };

    const checkSign = () => {
        const text = file.name?.split('.');
        const res = text[text.length - 1];
        if(res !== 'docx' && res !== 'doc') {
            return (
                <Button disabled color="primary">VIEWED</Button>
            );
        }
        if (file.signed) {
            
            return (
                <Button disabled color="primary">Signed</Button>
            );
        }
        return (
            <Button color="primary" onClick={()=>{setSOpen(true)}}>Sign</Button>
        );
    }
    return (
        <TableRow
            hover
            key={file.id}
        >
            <TableCell>
                <DescriptionIcon />
            </TableCell>
            <TableCell >
                <h3>{file.name}</h3>
                <div style={{ color: 'rgb(172, 172, 172)' }}>
                    <p>{moment(file.updatedAt).format('DD/MM/YYYY')}<span style={{ marginLeft: '15px' }}>{file.size} byte</span></p>
                </div>
            </TableCell>
            <TableCell>
            {checkSign()}

            <Dialog open={sopen} onClose={() => { setSOpen(false) }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="customized-dialog-title">SIGN TO FILE</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            Are you sure sign this file?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setSOpen(false) }} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={handleSign} color="primary">
                            Sign
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
            <TableCell>
                <Button variant="outlined" color="primary" onClick={handleDownload}>Download</Button>

                <Dialog
                    open={alert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => { setAlert(false) }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogContent style={{ width: '500px' }}>
                        Failure!!! Can not sign to file. Maybe you still not create your signature in account.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setAlert(false) }} color="primary">
                            OK
                       </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Sent <SendRoundedIcon />
                </Button>

                <Dialog open={open} onClose={handleSend} aria-labelledby="form-dialog-title">
                    <DialogTitle id="customized-dialog-title">SEND FILE</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            Please enter email reciever below to continue send file.
                    </DialogContentText>
                        <TextField
                            autoFocus
                            value={receiver}
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            onChange={(e) => setReceiver(e.target.value)}
                            fullWidth
                        />
                        {error}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpen(false) }} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={handleSend} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={iopen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => { setIOpen(false) }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogContent style={{ width: '500px' }}>
                        SUCESSFULLY!
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setIOpen(false) }} color="primary">
                            OK
                       </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>

            <TableCell>
                <IconButton aria-label="delete" onClick={() => setIDelete(true)}>
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={idelete}
                    onClose={() => { setIDelete(false) }}
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
                        <Button onClick={() => { setIDelete(false) }} color="primary" autoFocus>
                            No
          </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}
