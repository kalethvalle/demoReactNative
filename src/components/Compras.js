import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
} from 'react-native';

import { PricingCard, Card, Button, CheckBox, Text, Icon } from 'react-native-elements';
import * as  actions from  '../store/actions'
import { connect } from 'react-redux'

class Compras extends Component {
    setCartAnime = (payload) => {
        let anime_cart = this.props.cart_anime
        const index = anime_cart.indexOf(payload);
        
        anime_cart.splice(index, 1);

        this.props.function_cart_anime(anime_cart)
        this.props.subtraction()
    }

    render(){
        console.log(this.props.cart_anime)
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <PricingCard
                       color="#4f9deb"
                       title="Total Compra"
                       price="$0"
                       info={[`${this.props.cart_anime.length} Series`, 'Disfruta en Familia', 'All Core Features']}
                       button={
                            <Button
                                title='COMPRAR' 
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                icon={
                                    <Icon  
                                      iconStyle={{marginRight: 10}}
                                      name='store' 
                                      color='#ffffff' 
                                    />
                                }
                            />
                       }
                    />
                    <ScrollView horizontal>
                    { this.props.cart_anime.map((anime, index) => {
                        return(
                            <Card containerStyle={{marginBottom: 15,}} key={index}>
                                <View style={{flexDirection: "column"}}>
                                    <Image
                                        style={styles.image}
                                        source={{uri: anime.attributes.posterImage.small}}
                                    />
                                <Text style={styles.fontTitle} >
                                    {anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.slug}
                                </Text>

                                <Text style={styles.fontSubTitle} >
                                    {anime.attributes.titles.ja_jp}
                                </Text>

                                <Text style={styles.fontText} >
                                    { anime.attributes.ageRatingGuide }
                                </Text>

                                </View>
                                <Card.Divider/>
                                <Button
                                    title='Sacar del Carro' 
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    onPress={() => this.setCartAnime(anime)}
                                    iconRight
                                    icon={
                                        <Icon  
                                            iconStyle={{marginLeft: 10}}
                                            name='shopping-cart' 
                                            color='#ffffff' 
                                        />
                                    }
                                />
                            </Card>
                        )
                      })
                    }
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 2,
    padding: 5,
  },
  image: {
    width: 160,
    height: 210,
    borderRadius: 10,
    backgroundColor: '#f0f4f7'
  },
  fontTitle:{
    fontSize: 16,
    fontWeight: "bold",
  },
  fontSubTitle:{
    fontSize: 9,
  },
  fontText:{
    fontSize: 13,
  },

})

const mapStateToProps = state =>{
    return(
        {
            loggedIn: state.loggedIn,
            user: state.user,
            cart_anime: state.cart_anime,
        }
    )
}

export default connect(mapStateToProps, actions)(Compras)