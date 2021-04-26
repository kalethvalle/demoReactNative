import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ActivityIndicator ,
} from 'react-native';

import { NativeRouter as Router, Route, Link, Switch, Redirect } from "react-router-native";
import { Icon, Badge, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux'

/* Views */
import Logout from './Logout';

/* Componentes */
import Anime from '../components/Anime';
import MisCards from '../components/Cards';
import Compras from '../components/Compras';

class Home extends Component{
    state = {
        routes: [
            {
                path: '/',
                name_path: 'Animes',
                name_icon: 'tv'
            },
            {
                path: '/Contactos',
                name_path: 'Contactos',
                name_icon: 'users'
            },
            {
                path: '/Compras',
                name_path: 'Compras',
                name_icon: 'cart-plus'
            },
        ],
    }

    render(){
        console.log(this.props.user)
        return(
            <Router> 
                <View style={{flexDirection: "row",  justifyContent: "space-between"}}>
                    <Text h4 style={{marginLeft:10}}>
                        <Icon
                          iconStyle={{marginRight:10}}
                          name="user-circle"
                          type='font-awesome'
                          size={20}
                        />
                        Kaleth Valle
                    </Text>
                        <Logout />
                </View>
                <Switch>
                    <Route exact path="/" component={Anime} />
                    <Route exact path="/Contactos" component={MisCards} />
                    <Route exact path="/Compras" component={Compras} />
                </Switch>

                <View style={styles.container}>
                    <View style={styles.nav}>
                        {this.state.routes.map((url, index) => {
                            return(
                                <Link to={url.path} underlayColor="#EAECEE" style={styles.navItem} key={index}>
                                  <View>
                                    <Icon
                                       name={url.name_icon}
                                       type='font-awesome'
                                       color="#00aced"
                                       size={25}
                                    />
                                    { url.name_path == 'Compras' ?
                                        <Badge
                                           status="success"
                                           value={`${this.props.counterCart} +`}
                                           containerStyle={{ position: 'absolute', top: -4, right: -15 }}
                                        /> : null
                                    }
                                    <Text style={{color: "#00aced", fontWeight: "bold", fontSize: 11}}>
                                        {url.name_path}
                                    </Text>
                                  </View>
                                </Link>
                            )
                        })}
                    </View>
                </View>
            </Router>
        )
    }
}

const mapStateToProps = state =>{
    return(
        {
            loggedIn: state.loggedIn,
            user: state.user,
            counterCart: state.counterCart,
            cart_anime: state.cart_anime,
        }
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 0
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: '#737373',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default connect(mapStateToProps)(Home)