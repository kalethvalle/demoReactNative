import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Image,
  View,
  Linking,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { Button, Text, Overlay, AirbnbRating, Badge, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
/* Componentes */
import OpenURLButton from './OpenURLButton';

class Separator extends Component{
    render(){
        return(
            <View style={styles.separator} />
        )
    }
};

export default class About extends Component{
    state = {
        animes: [],
        show_animating: false,
        visible: false,
        pag: 0,
        Anime: {},
    }

    toggleOverlay = (anime) => {
        this.setState({
            visible: !this.state.visible,
            Anime: anime
        })
    }

    setAnime = (payload) => {
        this.setState({animes: payload})
    }

    setAnimating = (payload) => {
        this.setState({show_animating: payload})
    }

    setPaginaNext = (payload) => {
        this.setState({pag: this.state.pag + payload})
    }

    setPaginaPrevious = (payload) => {
        this.state.pag >= 20 ?
            this.setState({pag: this.state.pag - payload})
        :
            this.setState({pag: 0})
    }

    async onPressNext(payload) {
        try{
            await this.setPaginaNext(payload);
            await this.setAnimating(true);
            const res = await  fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${this.state.pag}`)
            const datos = await  res.json();
            await this.setAnime(datos.data)
            await this.setAnimating(false);
        } catch (err){
          console.log('error -> ', err)
        } 
    }

    async onPressPrevious(payload) {
        try{
            await this.setPaginaPrevious(payload);
            await this.setAnimating(true);
            const res = await  fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${this.state.pag}`)
            const datos = await  res.json();
            await this.setAnime(datos.data)
            await this.setAnimating(false);
        } catch (err){
          console.log('error -> ', err)
        } 
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    async componentDidMount(){
        try{
            await this.setAnimating(true);
            const res = await  fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0`)
            const datos = await  res.json();
            await this.setAnime(datos.data)
            await this.setAnimating(false);
        } catch (err){
          console.log('error -> ', err)
        } 
    }


    render(){
      return(
        <SafeAreaView style={styles.container}>
            {this.state.show_animating ?
                <ActivityIndicator
                    size="large"
                    color="#999"
                    animating={this.state.show_animating}
                /> : 
                    <View style={styles.viewBtn}> 
                        <Button
                            buttonStyle={{borderRadius: 50}}
                            type="clear"
                            icon={
                                < Icon
                                    name="arrow-left"
                                    type='font-awesome'
                                    size={23}
                                    color="#00aced"
                                />
                            }
                            disabled={this.state.pag >= 20 ? false : true}
                            onPress={() => this.onPressPrevious(20)}
                        />

                        <Text style={styles.baseText}>
                            <Text h4>
                                {"Animes Retro"}
                            </Text>
                        </Text>

                        <Button
                            buttonStyle={{borderRadius: 50}}
                            type="clear"
                            icon={
                                < Icon
                                    name="arrow-right"
                                    type='font-awesome'
                                    size={23}
                                    color="#00aced"
                                />
                            }
                            onPress={() => this.onPressNext(20)}
                        />
                    </View>
            }
            <ScrollView >

                {this.state.animes.map((anime, index) => {
                    return(
                        <View style={styles.card} key={index} >
                            <Image
                                style={styles.tinyLogo}
                                source={{uri: anime.attributes.posterImage.tiny}}
                            />
                            <View style={styles.content}>
                                <Text style={styles.fontTitle} >
                                    {anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.slug}
                                </Text>

                                <Text style={styles.fontSubTitle} >
                                    {anime.attributes.titles.ja_jp}
                                </Text>

                                <Text style={styles.fontText} >
                                    { anime.attributes.ageRatingGuide }
                                </Text>

                                <View style={{flexDirection: "row",  justifyContent: "space-between"}}>
                                   <View style={{flexDirection: "row",  justifyContent: "space-between"}}>
                                        <AirbnbRating 
                                          showRating={false}
                                          defaultRating={anime.attributes.favoritesCount}
                                          size={15}
                                        />
                                        <Badge value={`${anime.attributes.userCount} +`} status="success" />
                                   </View>

                                    <Text style={styles.fontStatus} >
                                        { anime.attributes.status }
                                    </Text>
                                </View>

                               <Separator />
                               <View style={styles.viewBtn}>

                                    <OpenURLButton 
                                        color="#F9410C" 
                                        icon="youtube"
                                        size={20}
                                        text_color="white"
                                        url={`https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`}
                                    >
                                        Tráiler
                                    </OpenURLButton>

                                    <Button
                                        buttonStyle={{borderRadius: 10}}
                                        icon={
                                            < Icon
                                                name="cart-plus"
                                                type='font-awesome'
                                                size={20}
                                                color="white"
                                            />
                                        }
                                        iconRight
                                        title="Add  "
                                    />
                                </View>
                            </View>
                        </View>
                    )
                })}
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
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold"
  },
  card:{
    flexDirection: "row", 
    marginTop: 5,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "#eaeaea"
  },
  content:{
    marginLeft: 5,
    marginRight: 10,
    flex: 1
  },
  tinyLogo: {
    width: 80,
    height: 127,
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
  fontStatus:{
    fontSize: 13,
    textAlign: "right",
    color: "#EF4722",
  },
  viewBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eaeaea"
  },
  separator:{
    marginVertical: 5,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
