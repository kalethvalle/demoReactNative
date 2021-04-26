import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import * as  actions from  '../store/actions'
import { connect } from 'react-redux'
import axios from "axios"

class Logout extends Component{
    async _cerrarSesion(){
        try{
            const res = await this._logout()
            switch(res.status){
                case 200:
                    await this.props.set_user('')
                    await this.props.function_token('') 
                    await this.props.function_cart_anime(new Array())
                    await this.props.initialize_cart()
                    break;
            }
        }catch(err){
            console.log('Error', err)
        }
    }

    async _logout(){
        const url = `${this.props.pathApi}/rest-auth/logout/`
        let options = {
            method: 'POST',
            data: '',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Token ${this.props.loggedIn}`,
            },
            params: '',
            url: url,
        }

        try{
            const res = await axios(options)
            switch(res.status){
                case 200:
                    return res
                default:
                    return ''
            }
        }catch(err){
            console.log('Error -> ', err)
        }

    }

    render(){
        return(
            <Icon
              iconStyle={{marginTop: 5, marginRight: 10,}}
              name="sign-out"
              type='font-awesome'
              size={20}
              onPress={() => this._cerrarSesion()}
            />

        )
    }
}

const mapStateToProps = state =>{
    return(
        {
            pathApi: state.pathApi,
            loggedIn: state.loggedIn,
            counterCart: state.counterCart,
        }
    )
}

export default connect(mapStateToProps, actions)(Logout)