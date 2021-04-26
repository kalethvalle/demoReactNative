import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default class Loading extends Component {
    render(){
        return(
            <ActivityIndicator
              size="large"
              color="#999"
              animating={this.props.loading}
            />
        )
    }
}