'use client'
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material'

import { useState, useEffect } from 'react'

const columns = [
    { field: 'UUID', headerName: 'Invoice ID' },
    { field: 'username', headerName: 'User' },
    { field: 'digest', headerName: 'Digest' },
    { field: 'status', headerName: 'Payment Status' },
    { field: 'action', headerName: 'Action' },
];


const OrderTable = () => {
    const [rows, setRow] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const retriveOrder = () => {
        axios.post('/api/get_orders')
            .then(res =>
                setRow(res.data)
            )
    }

    const cancelOrder = async (invoice_id) => {
        await axios.post('/api/cancel_order', { invoice_id: invoice_id })
        retriveOrder()
    }

    useEffect(() => {
        retriveOrder()
    }, [])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.UUID}
                                        // align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.UUID}>
                                            <TableCell>
                                                {row.UUID}
                                            </TableCell>
                                            <TableCell>
                                                {row.username}
                                            </TableCell>
                                            <TableCell>
                                                {row.digest}
                                            </TableCell>
                                            <TableCell>
                                                {"orderDetails" in row ?
                                                    "Completed" : "Pending"}
                                            </TableCell>
                                            <TableCell>
                                                {!("orderDetails" in row) && <Button
                                                    color='error'
                                                    variant="outlined"
                                                    onClick={() => cancelOrder(row.UUID)}
                                                >
                                                    Cancel Order
                                                </Button>}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default OrderTable 