import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider } from '@material-ui/styles';

import Login from './Login';

import theme from './theme';
import { SIGN_IN_REQ, SIGN_IN_RES, ALERT } from './index.js';

export default function withAuth(ComponentToProtect, protectedModule = '', path = '') {
    class ProtectedComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false,
                loading: true,
                hasAccessRight: true
            };
        }
        componentDidMount() {
            this.getUser().then((user) => {
                var hasAccessRight = true;
                var redirect = false;

                if (user && user._id) {
                    if (protectedModule && !(user.rights.indexOf(protectedModule) >= 0)) {
                        hasAccessRight = false;
                    }
                } else {
                    redirect = true;
                }

                this.setState({
                    redirect,
                    loading: false,
                    hasAccessRight
                });
            });
        }
        getUser = () => {
            // checks the state whether there exists an active user, if no, active user should be fetched from backend
            return new Promise((resolve, reject) => {
                if (this.props.user && this.props.user.loggedIn) {
                    resolve(this.props.user);
                } else {
                    this.props.getActiveUser().then((user) => {
                        resolve(user);
                    });
                }
            });
        }
        render() {
            console.log('withAuth', protectedModule);
            const { redirect, loading, hasAccessRight } = this.state;
            const props = this.props;

            if (props.location.pathname === (props.match.path + '/login')) {
                return (
                    <ThemeProvider theme={theme}>
            <Login />
          </ThemeProvider>
                );
            }

            if (loading) {
                return <LinearProgress />;
            }

            if (!hasAccessRight) {
                console.log('has no access right', props.user.rights);
                props.history.goBack();
            }

            if (!props.user.loggedIn && redirect) {
                window.localStorage.setItem('lastVisitedPath', this.props.location.pathname);
                console.log('redirecting', props.match.path + "/login");
                return <Redirect to={'/admin/login'} />;
            }

            return (
                <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            user: state.Admin.user
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            getActiveUser: () => {
                dispatch({ type: SIGN_IN_REQ });
                return fetch('/user/active').then((res) => res.json()).then((json) => {
                    dispatch({
                        type: SIGN_IN_RES,
                        payload: json.user
                    });
                    return json.user;
                }).catch((err) => {
                    // end request
                    dispatch({
                        type: SIGN_IN_RES,
                        payload: {}
                    });

                    // error
                    console.error(err);
                    dispatch({
                        type: ALERT,
                        payload: {
                            type: 'error',
                            text: 'Connection with server failed...'
                        }
                    });
                    return {}
                });
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(ProtectedComponent)
}