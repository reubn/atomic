import React from 'react'
import {Text, View, ScrollView} from 'react-native'
import Carousel from 'react-native-looped-carousel'

import SetupPage from '../SetupPage'

import AuthPatternContainer from './AuthPatternContainer'

import {container, scroll, scrollContainer, carousel, message, authPage, bulletsContainer, chosenBullet, bullet} from './styles'

export default class Auth extends SetupPage {
  static navigationOptions = {
    title: 'Pairing'
  }

  params = {
    rightButtonActive: true,
    rightButtonHandler: ({navigation: {navigate}}) => navigate('')
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
            onAnimateNextPage={p => console.log(p)}
          >{authPages}</Carousel>
          <Text style={message}>Look at your clock. From left to right, copy the four patterns that you can see. Swipe to move to the next screen.</Text>
        </ScrollView>
      </View>
    )
  }
}
