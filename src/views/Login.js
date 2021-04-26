import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ToastAndroid,
} from 'react-native';
import { Text, Input, Icon, Button, Image } from 'react-native-elements';
import * as  actions from  '../store/actions'
import { connect } from 'react-redux'
import axios from "axios"

/* Components */
import Loading from '../components/Loading';

class Login extends Component{
    state = {
        username: '',
        password: '',
        btn_loading: false
    }

    setBtnLoading = () =>{
        this.setState({
            btn_loading: !this.state.btn_loading,
        })
    }

    showToast = () => {
        ToastAndroid.showWithGravity(
            "Usuario o Contraseña son incorrectos ...!",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    }

    async _iniciarSesion(){
        try{
            await this.setBtnLoading()
            const token = await this._login()
            console.log(token)
            if(token != 400){
                const data = await this._getUSer(token)
                await this.props.set_user(data)
                await this.setBtnLoading()
                await this.props.function_token(token)
            }else{
                await this.showToast()
                await this.setBtnLoading()
            }
        }catch (err){
            console.log(err)
        }

    }

    async _login(){
        const url = `${this.props.pathApi}/rest-auth/login/`
        let data = {
            username: this.state.username,
            password: this.state.password
        }

        let options = {
                method: 'POST',
                data: data,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                params: '',
                url: url,
        }

        try{
            const res = await axios(options)
            switch(res.status){
                case 200:
                    return res.data.key
                default:
                    return ''
            }
        }catch(err){
            console.log('Error -> ', err)
            return 400
        }
    }

    async _getUSer(token){
        const url = `${this.props.pathApi}/rest-auth/user/`
        let options = {
                method: 'GET',
                data: '',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Authorization": `Token ${token}`,
                },
                params: '',
                url: url,
        }

        try{
            const res = await axios(options)
            switch(res.status){
                case 200:
                    return res.data
                default:
                    return ''
            }
        }catch(err){
            console.log('Error -> ', err)
        }
    }

    render(){
      return(
        <View style={styles.center}>
            <Image
                style={styles.image}
                source={{uri: "https://gravatar.com/avatar/aa7c0f7ab935b832ffe14c779e8472a4?s=400&d=mp&r=x"}}
            />

            <Text h2 style={{textAlign: "center", margin: 10,}}>
                Iniciar Sesión
            </Text>

            <Input
                placeholder='Usuario'
                onChangeText={value => this.setState({ username: value })}
                value={this.state.username}
                leftIcon={
                    <Icon
                       name='user'
                       type='font-awesome'
                       size={24}
                       color='black'
                    />
                }
            />

            <Input
                placeholder="Contraseña"
                onChangeText={value => this.setState({ password: value })}
                value={this.state.password}
                secureTextEntry={true}
                leftIcon={
                    <Icon
                      name='lock'
                      type='font-awesome'
                      size={24}
                      color='black'
                    />
                }
            />

            <Button
                containerStyle={{marginBottom: 5}}
                iconRight
                onPress={() => this._iniciarSesion()}
                title="Iniciar Sesión"
                icon={
                    <Icon
                        name="arrow-right"
                        size={20}
                        color="white"
                    />
                }
            />
            {
                this.state.btn_loading ?
                    <Loading loading={this.state.btn_loading} />
                : null
            }
            <View style={{flexDirection: "row"}}>
                <Text style={{marginTop: 10, fontStyle: "italic"}}>
                    no tengo cuenta.
                </Text>
                <Button
                   title="Crear Cuenta"
                   type="clear"
                />
            </View>

        </View>
      )
    }
}

const styles = StyleSheet.create({
  center:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontTitle:{
     fontSize: 24,
  },
  fontText:{
    fontSize: 18, 
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },

});

const mapStateToProps = state =>{
    return(
        {
            pathApi: state.pathApi,
            user: state.user,
            loggedIn: state.loggedIn,
        }
    )
}

export default connect(mapStateToProps, actions)(Login)