import React, { Component } from "react";
import { View, Image, FlatList, StyleSheet, Animated  } from 'react-native'
import { Card, Slider, Text, ListItem, Avatar, Button, ButtonGroup, SearchBar , Icon, Overlay, CheckBox, } from 'react-native-elements'

import users from '../assets/users'

export default class MisCards extends Component{
    state = {
        search: '',
        list: new Array(),
        selectedIndex : undefined,
        visibleSex: false,
        visibleAge: false,
        checkedSexM: false,
        checkedSexF: false,
        value: 0,
    }

    setList = (payload) => {
        this.setState({list: payload})
    }

    updateSearch = (search) => {
        let buscador = users.filter((filtro) => {
            const textOne = filtro.name.toLowerCase();
            const textTwo = filtro.email.toLowerCase();
            const searchText = search.toLowerCase();

            return (
                textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            )
        });

        this.setState({ search });
        search ? this.setList(buscador) : null
    }

    clearSearch = () => { 
        const newList = new Array()
        this.setList(newList);
        this.setList(users);
    }

    updateIndex = (payload) => {
        this.setState({selectedIndex: payload})
        switch(payload){
            case 0:
                this.toggleOverlaySex();
                break;
            case 1:
                this.toggleOverlayAge();
                break;
            default:
                console.log('index filter default: ', payload)
                break
        }
    }

    toggleOverlayAge = () => {
        this.setState({visibleAge: !this.state.visibleAge});
    }

    setValue = (payload) => {
        this.setState({value: payload})
    }

    toggleOverlaySex = () => {
        this.setState({visibleSex: !this.state.visibleSex});
    }

    setChekedSex = (payload) => {
        this.setState({checkedSexM: payload.checkedSexM})
        this.setState({checkedSexF: payload.checkedSexF})
    }

    filtroSexo = () => {
        this.toggleOverlaySex()
        if(this.state.checkedSexM){ 
            let buscador = users.filter((filtro) => {
                return filtro.sex == 'Male';
            });
            this.setList(buscador)
        }else if(this.state.checkedSexF){
            let buscador = users.filter((filtro) => {
                return filtro.sex == 'Famale';
            });
            this.setList(buscador)
        }else{
            this.setState({selectedIndex: undefined})
            this.setList(users)
        }
    }

    async componentDidMount(){
        await this.setList(users)
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <Avatar 
              overlayContainerStyle={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}
              size="medium"
              rounded
              title={item.name[0]}
            />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    render(){
        const buttons = ['Filtrar por Sexo', 'Filtrar por Edad']
        const { search, selectedIndex  } = this.state
        return(
            <View style={styles.center}>
                <SearchBar
                    inputStyle={{color: 'white'}}
                    placeholder="Buscar"
                    onChangeText={this.updateSearch}
                    onClear={this.clearSearch}
                    lightTheme
                    value={search}
                />

                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 30}}
                />

                <Overlay 
                  isVisible={this.state.visibleSex} 
                  onBackdropPress={this.toggleOverlaySex}>
                    <Text h3 style={{textAlign: "center",}}>
                        Filtrar Sexo
                    </Text>
                    <Card containerStyle={{marginBottom: 15,}}>
                        <View style={{flexDirection: "row"}}>
                            <Image
                              style={styles.image}
                              source={{uri: "https://gravatar.com/avatar/499eecfb08d5abcf0580de57d18329d2?s=400&d=robohash&r=x"}}
                            />
                            <CheckBox
                              title='Masculino  '
                              checked={this.state.checkedSexM}
                              onPress={() => this.setChekedSex({checkedSexM: true, checkedSexF: false})}
                            /> 
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Image
                              style={styles.image}
                              source={{uri: "https://gravatar.com/avatar/f9a0a4ae1ec449ddaf4103cf06634334?s=400&d=robohash&r=x"}}
                            />
                            <CheckBox
                              title='Femenino   '
                              checked={this.state.checkedSexF}
                              onPress={() => this.setChekedSex({checkedSexM: false, checkedSexF: true})}
                            /> 
                        </View>
                        {this.state.checkedSexM || this.state.checkedSexF ?
                            <View style={{flexDirection: "row"}}>
                                <Image
                                  style={styles.image}
                                />
                                <CheckBox
                                  title='Quitar Filtro'
                                  onPress={() => this.setChekedSex({checkedSexM: false, checkedSexF: false})}
                                /> 
                            </View> : 
                          null
                        }
                        <Card.Divider/>
                        <Button
                           buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                           icon={
                                  <Icon  
                                    iconStyle={{marginLeft: 10}}
                                    name='check' 
                                    color='#ffffff' 
                                    />
                                }
                           iconRight
                           title='FILTRAR' 
                           onPress={() => this.filtroSexo()}
                        />
                    </Card>
                </Overlay>

                <Overlay 
                  isVisible={this.state.visibleAge} 
                  onBackdropPress={this.toggleOverlayAge}>
                    <Text h3 style={{textAlign: "center",}}>
                        Filtrar Edad
                    </Text>
                    <Card containerStyle={{marginBottom: 15,}}>
                        <View >
                            <Text h4>Pendiente ?</Text>
                        </View>
                        <Card.Divider/>
                    </Card>
                </Overlay>

                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.list}
                  renderItem={this.renderItem}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
  center:{
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#f0f4f7'
  },
})
