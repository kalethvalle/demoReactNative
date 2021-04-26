import React, { Component } from 'react';
import { NativeRouter as Router, Route, Link, Switch, Redirect } from "react-router-native";
import { connect } from 'react-redux'

/* Componentes */
import Login from './views/Login';
import Home from './views/Home';

class Main extends Component{

    render(){
        return(
            <Router> 
                {this.props.loggedIn ? <Redirect to="/Home" /> : <Redirect to="/Login" />}
                <Switch>
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Home" component={Home} />
                </Switch>
            </Router> 
        )
    }
}

const mapStateToProps = state =>{
    return(
        {
            loggedIn: state.loggedIn,
        }
    )
}

export default connect(mapStateToProps)(Main)