
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
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteBox from './DeleteBox';
import { userService } from '../../../api';
export default function File({ transaction }) {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = async () => {
        const data = {
            toEmail: transaction.sender,
            title,
            content,
        }
        await userService.replyMail(data).then(() => {
            setOpen(false);
            setTitle('');
            setContent('');
        })
    }

    return (
        <TableRow
            hover
            key={transaction?.id}
        >
            <TableCell>
                <DescriptionIcon />
            </TableCell>
            <TableCell >
                <h3>{transaction?.fileId?.name}</h3>
                <div style={{ color: 'rgb(172, 172, 172)' }}>
                    <p>{moment(transaction?.updatedAt).format('DD/MM/YYYY')}<span style={{ marginLeft: '15px' }}>{transaction?.fileId?.size} byte</span></p>
                </div>
            </TableCell>
            <TableCell>
                {transaction?.sender}
            </TableCell>
            <TableCell>
                <Button color="primary" onClick={handleClickOpen} >Reply <ReplyIcon /></Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="customized-dialog-title">Reply to {` ${transaction.sender}`} </DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            label="Title"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="iname"
                            value={content}
                            onChange={(e) => { setContent(e.target.value) }}
                            label="Content"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSend} color="primary">
                            Send
                         </Button>
                    </DialogActions>
                </Dialog>
            </TableCell>
            <TableCell>
                <DeleteBox id={transaction._id} />

            </TableCell>
        </TableRow>
    )
}
