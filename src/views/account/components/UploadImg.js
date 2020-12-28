import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {useDispatch} from 'react-redux';
import { userActions} from '../../../redux/actions';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleFile = async ({target}) => {
    const data = new FormData();
    data.append('file',target.files[0] )
    dispatch(userActions.updateUser(data));
  }
  return (
    <div className={classes.root} style={{marginLeft:'43%'}}>
      
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFile} />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}