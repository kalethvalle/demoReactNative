import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
  ActivityIndicator ,
} from 'react-native';


/* Store */
import { store } from './src/store/store'
import { NativeRouter as Router, Route, Link, Switch, } from "react-router-native";
import { Icon, } from 'react-native-elements';

/* Componentes */
import Login from './src/components/Login';
import MisCards from './src/components/Cards';
import Anime from './src/components/Anime';

export default class App extends Component{
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
        ],
    }


    
    render(){
        return(
            <Router> 
                <Switch>
                    <Route exact path="/" component={Anime} />
                    <Route exact path="/Contactos" component={MisCards} />
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

