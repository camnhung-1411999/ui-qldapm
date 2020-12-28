/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  Grid,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import File from './File';
import AddBtn from './AddBtn';
import { useDispatch, useSelector } from 'react-redux';
import { fileAction } from '../../../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Documents = ({ className, ...rest }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const files = useSelector(state => state.files.items);
  const ifile = useSelector(state => state.files.item);

  useEffect(() => {
    dispatch(fileAction.getListFile());
  }, [ifile])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {files?.name}
      <Grid
          container
          spacing={3}
        >
          <Grid item xs={10}>
          <CardHeader title="MY DOCUMENT" style={{ color: 'blue' }} />
          </Grid>

          <Grid item>
          <AddBtn style={{float: 'right'}}/>

          </Grid>
        </Grid>
      
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableBody>
              {files?.map((order) => (
                <File file={order}/>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

Documents.propTypes = {
  className: PropTypes.string
};

export default Documents;
