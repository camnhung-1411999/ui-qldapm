import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import TopBar from './TopBar';
import { alertActions } from 'src/redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const { alert } = props;
  console.log(alert)

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {
            alert.message && 
            <Alert severity={alert.type}>
              {alert.message}
            </Alert>
            }
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(MainLayout);
