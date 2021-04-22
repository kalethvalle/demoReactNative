import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { NativeRouter as Router, Route, Link, Switch, Redirect } from "react-router-native";
import { Text, Input, Icon, Button, Image } from 'react-native-elements';

/* Componentes */
import Counter from './Counter';

export default class Login extends Component{

    render(){
      return(
        <Router>
        <View style={styles.center}>
            <Image
                style={styles.image}
                source={{uri: "https://gravatar.com/avatar/aa7c0f7ab935b832ffe14c779e8472a4?s=400&d=mp&r=x"}}
            />

          <Text h2 style={{textAlign: "center", margin: 10,}}>
            Iniciar Sesión
          </Text>

        
            <Input
                placeholder='Nombre de Usuario'
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
                leftIcon={
                    <Icon
                      name='lock'
                      type='font-awesome'
                      size={24}
                      color='black'
                    />
                }
                secureTextEntry={true}
                onChangeText={value => this.setState({ comment: value })}
            />


            <Button
                containerStyle={{marginBottom: 5}}
                icon={
                    <Icon
                        name="arrow-right"
                        size={20}
                        color="white"
                    />
                }
                iconRight
                title="Iniciar Sesión"
            />


<Link to="/Counter">  
        <Text>
           Registrase
        </Text>
</Link>

        </View>
            </Router>
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
