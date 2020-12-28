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
    TableCell,
    TableRow,
    makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FileReceived from './FileReceived';
import { useDispatch, useSelector } from 'react-redux';
import { transactionAction } from '../../../redux/actions'

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
    const transactions = useSelector(state => state.transactions.items)
    const itrans = useSelector(state => state.transactions.item)
    useEffect(() => {
        dispatch(transactionAction.listReceived())
    }, [itrans])
    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            {transactions?.name}
            <Grid
                container
                spacing={3}
            >
                <Grid item xs={10}>
                    <CardHeader title="RECEIVED" style={{ color: 'blue' }} />
                </Grid>
            </Grid>

            <Divider />
            <PerfectScrollbar>
                <Box minWidth={800}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>File</TableCell>
                                <TableCell> Sender</TableCell>
                            </TableRow>
                            {transactions?.map((order) => (
                                <FileReceived transaction={order} />
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
