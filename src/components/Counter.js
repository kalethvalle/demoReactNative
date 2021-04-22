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
} from 'react-native';

export default class Counter extends Component{
    state = {
       contador: 0
    }

    addConta = () => {
        this.setState({contador: this.state.contador + 1})
    }

    substractConta = () => {
        this.setState({contador: this.state.contador - 1})
    }

    render(){
      return(
        <View style={styles.center}>
            <Text style={styles.fontTitle}>
                Hola {this.props.name}
            </Text>
            <Button
                onPress={() => this.addConta()}
                title="Add +"
            />
            <Text style={styles.fontText}>
                {this.state.contador}
            </Text>
            <Button
                onPress={() => this.substractConta()}
                title="Substract -"
            />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  center:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontTitle:{
     fontSize: 24,
  },
  fontText:{
    fontSize: 18,
  }
});
