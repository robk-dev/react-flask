import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import axios from '../../axios';
import { Data } from '../Table/Table';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#00AF66'
    }
}));

type FormInputs = {
    name: string;
    email: string;
    date: Date;
    kids: number;
};

interface FormProps {
    setData(data: Data[]): void
}

export const Form: FC<FormProps> = ({ setData }) => {
    const classes = useStyles();


    const onSubmit = async (form: FormInputs) => {
        try {
            const { data } = await axios.post('/api/users', form);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    let today = new Date();
    const max_18_years_ago = new Date(today.setFullYear(today.getFullYear() - 18)).toISOString().split('T')[0];

    const { register, handleSubmit, errors } = useForm<FormInputs>({
        criteriaMode: "all"
    });

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                inputRef={register({
                    required: "NAME IS REQUIRED",
                    minLength: { value: 1, message: 'PEOPLE\'S NAMES CONTAIN AT LEAST ONE CHARACTER' },
                    maxLength: { value: 100, message: '>100 CHARS FOR NAME IS PROBABLY TOO MUCH' }
                })}
            />
            <ErrorMessage errors={errors} name="name" />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                inputRef={register({
                    required: "EMAIL REQUIRED",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "INVALID EMAIL ADDRESS"
                    },
                    maxLength: { value: 100, message: '>100 CHARS FOR EMAIL IS PROBABLY TOO MUCH' }
                })}
            />
            <ErrorMessage errors={errors} name="email" />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="kids"
                type="number"
                label="Number of children"
                inputProps={{
                    max: 9999,
                    min: 0
                }}
                name="kids"
                inputRef={register({
                    required: "NUMBER OF CHILDREN IS REQUIRED"
                })} />
            <ErrorMessage errors={errors} name="kids" />
            <TextField
                id="date"
                label="Birthday"
                type="date"
                name='date'
                required
                fullWidth
                InputProps={{
                    inputProps: { max: max_18_years_ago, min: '1900-01-01' }
                }}
                defaultValue={max_18_years_ago}
                inputRef={register({
                    required: "BIRTHDAY IS REQUIRED",
                })}
            />
            <ErrorMessage errors={errors} name="date" />


            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Submit
                    </Button>
        </form >
    );
}