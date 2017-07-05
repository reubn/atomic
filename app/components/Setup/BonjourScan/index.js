import React from 'react'
import {View, SectionList} from 'react-native'

import SetupPage from '../SetupPage'

import Item from './Item'
import ItemSeparator from './ItemSeparator'
import SectionHeader from './SectionHeader'
import SectionFooter from './SectionFooter'

import {container} from './styles'

export default class Welcome extends SetupPage {
  static navigationOptions = {
    title: 'Select Your Clock'
  }

  params = {
    next: 'Welcome'
  }

  render(){
    return (
      <View style={container}>
        <SectionList
          sections={[
            {title: 'UNPAIRED', data: ['New Clock 1']},
            {title: 'PAIRED', data: ['Bedroom', 'Kitchen', 'Living Room']}
          ]}
          keyExtractor={() => Math.random()}
          renderItem={Item}
          ItemSeparatorComponent={ItemSeparator}
          renderSectionHeader={SectionHeader}
          renderSectionFooter={SectionFooter}
        />
      </View>
    )
  }
}
