import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import authService from '../../services/auth.service';
import CustomizedSnackbars from '../common/CustomizedSnackbars';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            maxWidth: '100%',
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1,
            color: '#333333',
            backgroundColor: '#d2bba6',
            '&:hover': {
                backgroundColor: '#d2bba6',
            },
        },
        header: {
            textAlign: 'center',
            backgroundColor: '#d2bba6',
            color: '#333333'
        },
        card: {
            marginTop: theme.spacing(10),
            background: 'linear-gradient(45deg, #f8e7cd 30%, #e6d5c5 90%)',
        },
    })
);

//state type

type State = {
    firstName: string
    lastName: string
    avata: string
    email: string
    password: string
    isButtonDisabled: boolean
    message: string
    activeSnackBar: boolean
};

const initialState: State = {
    firstName: '',
    lastName: '',
    avata: '',
    email: '',
    password: '',
    isButtonDisabled: true,
    message: '',
    activeSnackBar: false
};

type Action = { type: 'setFirstName', payload: string }
    | { type: 'setLastName', payload: string }
    | { type: 'setAvata', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'registerFailed', payload: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setFirstName':
            return {
                ...state,
                firstName: action.payload
            };
        case 'setLastName':
            return {
                ...state,
                lastName: action.payload
            };
        case 'setAvata':
            return {
                ...state,
                avata: action.payload
            };
        case 'setEmail':
            return {
                ...state,
                email: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'registerFailed':
            return {
                ...state,
                message: action.payload,
                activeSnackBar: !state.activeSnackBar
            };
    }
}

export default function Register() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [helperText, setHelperText] = React.useState<String>("");
    const [isError, setIsError] = React.useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if (state.email.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.email, state.password, state.firstName, state.lastName]);

    const handleRegister = () => {
        const userRegister = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password
        }

        authService.register(userRegister).then(
            () => {
                window.setTimeout(function () {
                    history.push('/login');
                }, 1000);
            },
            (error) => {
                if (String(error.response.data.message) === "This email address is already being used") {
                    setIsError(true);
                    setHelperText("This email address is already being used")
                } else {
                    dispatch({
                        type: 'registerFailed',
                        payload: error.response.data.message
                    });
                }
            }
        );
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleRegister();
        }
    };

    const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setFirstName',
                payload: event.target.value
            });
        };

    const handleAvataChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setAvata',
                payload: event.target.value
            });
        };

    const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setLastName',
                payload: event.target.value
            });
        };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            if (validateEmail(event.target.value)) {
                dispatch({
                    type: 'setEmail',
                    payload: event.target.value
                });

                setIsError(false);
                setHelperText("");
            } else {
                setIsError(true);
                setHelperText("Email is not valid");
                dispatch({
                    type: 'setIsButtonDisabled',
                    payload: true
                });
            }
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    return (
        <>
            <form className={classes.container} noValidate>
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Register" />
                    <CardContent>
                        <div>
                            <TextField
                                fullWidth
                                id="firstName"
                                type="text"
                                label="First name"
                                placeholder="First name"
                                margin="normal"
                                onChange={handleFirstNameChange}
                                onKeyPress={handleKeyPress}
                            />
                            <TextField
                                fullWidth
                                id="lastName"
                                type="text"
                                label="Last name"
                                placeholder="Last name"
                                margin="normal"
                                onChange={handleLastNameChange}
                                onKeyPress={handleKeyPress}
                            />
                            <TextField
                                fullWidth
                                id="avata"
                                type="text"
                                label="Avata"
                                placeholder="Avata link"
                                margin="normal"
                                onChange={handleAvataChange}
                                onKeyPress={handleKeyPress}
                            />
                            <TextField
                                required
                                error={isError}
                                helperText={helperText}
                                fullWidth
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                margin="normal"
                                onChange={handleEmailChange}
                                onKeyPress={handleKeyPress}
                            />
                            <TextField
                                required
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className={classes.loginBtn}
                            onClick={handleRegister}
                            disabled={state.isButtonDisabled}>
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <CustomizedSnackbars active={state.activeSnackBar} status={'error'} autoHideDuration={4000} message={state.message} />
        </>
    );
}