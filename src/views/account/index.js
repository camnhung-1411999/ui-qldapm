import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Signature from './components/Signature';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: 'scale',
  containerStyle: {
    zIndex: 200
  }
};

const Account = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
            <Signature/>
          </Grid>
          <Provider template={AlertTemplate} {...options}>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetails />
            </Grid>
          </Provider>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
