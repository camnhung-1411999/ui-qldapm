import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { fileAction } from '../../../redux/actions';
import { useDispatch } from 'react-redux'
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

export default function AddBtn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleFile = async ({target}) => {
    const data = new FormData();
    data.append('file',target.files[0] )
    dispatch(fileAction.upload(data))
  }
  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFile}
      />
      <label htmlFor="contained-button-file">
        <Button  variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />} >
          Upload
        </Button>
      </label>      
    </div>
  );
}