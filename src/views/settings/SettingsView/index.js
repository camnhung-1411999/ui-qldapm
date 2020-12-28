import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Notifications from './Notifications';
import Password from './Password';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

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

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Provider template={AlertTemplate} {...options}>
        <Container maxWidth="lg">
          {/* <Notifications /> */}
          <Box mt={3}>
            <Password />
          </Box>
        </Container>
      </Provider>
    </Page>
  );
};

export default SettingsView;
