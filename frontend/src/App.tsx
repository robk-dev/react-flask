import React, { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/Form/Form';
import { Data, MyTable } from './components/Table/Table';
import { Fluid } from './components/Fluid/Fluid';

import axios from './axios';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '-6px 10px 30px 4px #00000069',
        border: '2px solid #dddddd'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

const getData = async (setData: Function) => {
    try {
        const { data } = await axios.get('/api/users');
        setData(data);
    } catch (error) {
        console.error(error);
    }
}
export default function App() {
    const classes = useStyles();
    const [data, setData] = useState<Data[] | []>([]);
    useEffect(() => {
        getData(setData);
    }, []);

    return (
        <Container component="main" >
            <Fluid />
            <div className={classes.paper}>
                <CssBaseline />

                <Form setData={setData} />
                <MyTable rows={data} />
            </div>
        </Container >
    )
}

