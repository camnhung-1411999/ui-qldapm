import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { userService } from '../../../api'
import { useAlert } from "react-alert";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const alert = useAlert();
  const classes = useStyles();
  const [values, setValues] = useState({
    oldPassword: '',
    password: '',
    confirm: ''
  });

  function awaitReload() {
    return new Promise(resolve => {
      setTimeout(function () {
        userService.logout()
        resolve(window.location.assign('/login'))
      }, 3200);
    });
  }

  async function reLoadPage() {
    alert.success('Password has been updated');
    await awaitReload();
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const changePassword = () => {
    if ((values.confirm === '') || (values.oldPassword === '') || (values.password === '')) {
      alert.error('All information is required');
    }
    else if (values.confirm !== values.password) {
      alert.error('Verify that the new password is incorrect');
    }
    else {
      userService.update(values);
      values.oldPassword = '';
      values.password = '';
      values.confirm = '';
      reLoadPage();
    }
  };

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="oldPassword"
            onChange={handleChange}
            type="password"
            value={values.oldPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={changePassword}
          >
            Update
        </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
