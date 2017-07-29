import React from 'react'
import {Text, View, ScrollView} from 'react-native'
import Carousel from 'react-native-looped-carousel'

import {StackPage} from '../.././../CustomStackNavigator'

import AuthPatternContainer from './AuthPatternContainer'

import {container, scroll, scrollContainer, carousel, message, authPage, bulletsContainer, chosenBullet, bullet} from './styles'

export default class Auth extends StackPage {
  static navigationOptions = {
    title: 'Pairing'
  }

  params = {
    rightButton: {
      active: this.props.patternsValid,
      handler: ({navigation: {navigate}}) => {
        this.props.sendAuth()
        navigate('SetupEnd')
      }
    }
  }

  componentWillReceiveProps({patternsValid}){
    if(this.props.patternsValid !== patternsValid) this.props.navigation.setParams({...this.params, rightButton: {...this.params.rightButton, active: patternsValid}})
  }

  render(){
    const authPages = Array(4).fill().map((_, i) => <AuthPatternContainer style={authPage} key={`ap${i}`} index={i} />)
    return (
      <View style={container}>
        <ScrollView style={scroll} contentContainerStyle={scrollContainer}>
          <Carousel
            style={carousel}
            autoplay={false}
            bullets
            bulletStyle={bullet}
            chosenBulletStyle={chosenBullet}
            bulletsContainerStyle={bulletsContainer}
          >{authPages}</Carousel>
          <Text style={message}>Look at your clock. From left to right, copy the four patterns that you can see. Swipe to move to the next screen.</Text>
        </ScrollView>
      </View>
    )
  }
}
