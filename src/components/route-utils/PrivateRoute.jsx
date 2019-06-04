import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ firebase: state.firebase })

const PrivateRoute = ({ firebase, component: Component, ...rest }) => {
    const isAuth = Boolean(firebase && firebase.auth && firebase.auth.uid);
    return (
        <Route
            {...rest}
            component={props =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default connect(mapStateToProps)(PrivateRoute);