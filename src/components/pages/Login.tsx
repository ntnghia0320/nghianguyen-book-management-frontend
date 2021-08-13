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
            background: 'linear-gradient(45deg, #f8e7cd 30%, #e6d5c5 90%)',
        },
        header: {
            textAlign: 'center',
            background: 'linear-gradient(45deg, #f8e7cd 30%, #e6d5c5 90%)',
            color: '#333333'
        },
        card: {
            marginTop: theme.spacing(10)
        },
    })
);

//state type

type State = {
    username: string
    password: string
    isButtonDisabled: boolean
    message: string
    activeSnackBar: boolean
};

const initialState: State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    message: '',
    activeSnackBar: false
};

type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginFailed', payload: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
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
        case 'loginFailed':
            return {
                ...state,
                message: action.payload,
                activeSnackBar: !state.activeSnackBar
            };
    }
}

export default function Login() {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
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
    }, [state.username, state.password]);

    const handleLogin = () => {
        const userLogin = {
            email: state.username,
            password: state.password
        }

        authService.login(userLogin).then(
            () => {
                window.setTimeout(function () {
                    history.push('/home');
                }, 1000);
            },
            (error) => {
                dispatch({
                    type: 'loginFailed',
                    payload: 'Email or password incorect'
                });
            }
        );
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }

    return (
        <>
            <form className={classes.container} noValidate>
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Login App" />
                    <CardContent>
                        <div>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                type="email"
                                label="Username"
                                placeholder="Username"
                                margin="normal"
                                onChange={handleUsernameChange}
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
                            onClick={handleLogin}
                            disabled={state.isButtonDisabled}>
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <CustomizedSnackbars active={state.activeSnackBar} status={'error'} autoHideDuration={4000} message={state.message} />
        </>
    );
}