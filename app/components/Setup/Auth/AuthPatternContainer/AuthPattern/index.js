import React, {Component} from 'react'
import {View} from 'react-native'

import Pixel from './Pixel'

import {page, col as colStyle} from './styles'

export default class AuthPattern extends Component {
  pixelPress(colIndex, rowIndex){
    console.log(colIndex, rowIndex)
    const pattern = this.props.pattern
    pattern[colIndex][rowIndex] ^= 1

    this.props.savePattern(pattern)
  }
  render(){
    return (
      <View style={[this.props.style, page]}>
        {this.props.paddedPattern.map((col, colIndex) => (
          <View key={`c${colIndex}`} style={colStyle(this.props.style.width - this.props.style.margin)}>
            {col.map((state, rowIndex) => <Pixel key={`c${colIndex}r${rowIndex}`} state={state} onPress={() => this.pixelPress(colIndex - 2, rowIndex - 2)} />)}
          </View>
        ))}
      </View>
    )
  }
}
