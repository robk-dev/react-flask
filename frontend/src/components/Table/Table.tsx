import React, { FC, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { TableHeader } from './TableHead';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface Data {
    id: string;
    name: string;
    date: string;
    email: string;
    kids: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        }
    }),
);

export const MyTable: FC<{ rows: Data[] }> = ({ rows }) => {
    const classes = useStyles();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [search, setSearch] = useState<string>('');

    function sort_filter(array: Data[], comparator: (a: any, b: any) => number): Data[] {
        const new_arr = array.map((el, index) => [el, index] as [Data, number]); // cloning
        const filtered = search.length > 0
            ? new_arr.filter(([el]) => el.email.indexOf(search) > -1 || el.name.indexOf(search) > -1) // filter on name or email
            : new_arr;

        filtered.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return filtered.map((el) => el[0]);
    }

    const handleSearch = (event: any) => {
        setSearch(event && event.target && event.target.value);
        sort_filter(rows, getComparator(order, orderBy));
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="search"
                        label="Search..."
                        name="search"
                        autoComplete="search"
                        onChange={handleSearch}
                    />
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <TableHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {sort_filter(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `key-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" padding="default">
                                                {row.name}
                                            </TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell >{row.kids}</TableCell>
                                            <TableCell >{row.date ? new Date(row.date).toISOString().split('T')[0] : row.date}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
