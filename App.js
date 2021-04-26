import React, { Component } from 'react';
import { Provider } from 'react-redux';

/* Store */
import { store } from './src/store/store'

/* Componentes */
import Main from './src/Main';

export default class App extends Component{

    render(){
        return(
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}

