import React, { useEffect, useState } from 'react';
import { userService } from '../../../api'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useAlert } from "react-alert";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const [user, setUser] = useState({
    avatar: '/static/images/avatars/avatar_6.png',
    email: '',
    name: '',
    phone: '',
    address: ''
  })
  const iuser = useSelector(state=> state.users.item);
  useEffect(() => {

    const getUser = async () => {
      await userService.me().then((res) => {
        setUser({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          company: res.data.company,
        });
      })
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iuser]);
  const classes = useStyles();
  const alert = useAlert();

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const updateProfile = () => {
    userService.update(user);
    alert.success("Update successful");
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="PROFILE"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Name"
                name="firstName"
                onChange={handleChange}
                required
                value={user.name+ ''}
                variant="outlined"
              />
            </Grid>
          
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email+ ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={user.phone+ ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                required
                value={user.address + ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company"
                name="company"
                onChange={handleChange}
                required
                value={user.company+ ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
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
            onClick={updateProfile}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
