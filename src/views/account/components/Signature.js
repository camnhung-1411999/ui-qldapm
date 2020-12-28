import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import SignaturePad from "react-signature-canvas";
import {useDispatch} from 'react-redux';
import {userActions} from '../../../redux/actions';
import {userService} from '../../../api';

const useStyles = makeStyles({
    root: {
    },
});
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function MediaCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [imageURL, setImageURL] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAElBMVEXy8vL////6+vr19fX4+Pj8/Px/aeudAAACoklEQVR4nO3c227bMBBF0cgk//+XGwu6kRxeRnFaVGevt8a2AG3QQ0kN8vUFAAAAAAAAAAAAAAAAAAAAAACAv2j5Ba9/fVK/hVgOxHL4Prf0+qD08FgfPbfw8Fjpk8cjlgOxHIjlQCwHYjlIxgoh3DqeXqyQbl+Ky8VK551L9B5PLFb40X2eWKyf3RVrxUpFrMU36KVihbKV88pCKtarfjzlWlpSsepWvh1RPZbr3JVi1SPLObSUYlkri1g7ZpZDGau6zGI3PJWxjKHV+3gqv6NSsXxX8KkqoxWrXFq98R7rkaYVq6jVaxWMpScWK6vVPW9rqKnF2r5e71e6G6G5+vRifZ9zjHFwyZDM9acYayx7PHEOeWIZ4pI5ViGxatW16/UFYlUfsy/HiFUx7iC3oxCrZDx73oc8sQrRarUNeWLlrKepx5AnVqbZaq0lHytmd3/tVu8jqccK2VuMjfA65NVjLdf3mBvhKYjHStuaWTU2wkst6Vj71+64MBiTjXV+7cL2dmK1XJdS+W9i5bI2qfoJsYpXy1rDEa8aq7ymitYPibWqr6nWIT+spRjL+sJNbYmCsexR3n5FOpYdYmZL1IvVmkxrif6WKBerPcXHW6JarN7SGW6JYrH6Q2m0JYrF6rYabolasQatRluiVKzJG5rmXFOKNXhyvOpuiUKxJh4rLP0tUSfW3JPj7ddm1GNNtuptiTKxxsN9194SVWLNDPesifUBkVhzw33X2hI1Ys0O911jS9SI5WzVukuUiDU/3A/vj1XrUSHWjVb2/44JxPJshEWYl/GzJzpieYf7ztgSHx/rbitrS3x8rDsDa7MeJ+0UYn2K9i+zOT09Fn8ueNbCH6Ked3+utxGLWMQCAAAAAAAAAAAAAAAAAAAAAAD4//0BUyATTom0AxcAAAAASUVORK5CYII='); 

    const [content, setContent] = React.useState('Create signature');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(()=>{
        const getUser = async()=>{
            await userService.me().then((res)=>{
                if( res.data.signature){
                    setImageURL(res.data.signature);
                    setContent('Edit signature')
                }
            })
        }
        getUser();
    },[])

    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();

    const save = () =>{
        dispatch(userActions.updateUser({
            signature: sigCanvas.current.getTrimmedCanvas().toDataURL("image/jpg"),
        }));
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
        setContent('Edit signature');
        setOpen(false);
    }

    return (
        <Card className={classes.root} style={{ margin: '10% auto' }}>
             <CardContent>

          <Typography variant="body2" color="textSecondary" component="p">
            Let create signature for yourself!
          </Typography>
        </CardContent>
            <CardActionArea style={{ width:'100%'}}>
                <CardMedia
                    image={imageURL}
                    title="Contemplative Reptile"
                    style={{ height:'280px'}}
                />

            </CardActionArea>

            <CardActions >
                <Button variant="contained" color="secondary" style={{ margin: '10% auto' }} onClick={handleClickOpen}>
                    {content}
                </Button>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        CREATE YOUR SIGNATURE
                    </DialogTitle>
                    <DialogContent dividers>
                        Write in empty area below
                        </DialogContent>
                    <DialogContent dividers>
                        <SignaturePad
                            ref={sigCanvas}
                            canvasProps={{width: 400, height: 250}}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={clear} color="primary">
                            Clear
                          </Button>
                        <Button autoFocus onClick={save} color="primary">
                            Save
                          </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}